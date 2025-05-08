import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Get the existing data (if any) from the client
    const { lastFetchedTimestamp } = req.query;
    const lastFetchTime = lastFetchedTimestamp ? new Date(parseInt(lastFetchedTimestamp)) : new Date(0);

    // Get all data in parallel
    const [
      categoriesCount,
      productsCount,
      ordersCount,
      usersCount,
      bookingsCount,
      rentalsCount,
      categories,
      ordersPerDay,
      bookingsPerDay,
      rentalsPerDay,
      topBuyers,
      mostBookedProducts,
      mostRentedCars,
      bookingDurationStats,
      rentalDurationStats,
      recentOrders,
      recentBookings,
      recentRentals
    ] = await Promise.all([
      db.collection("categories").countDocuments(),
      db.collection("products").countDocuments(),
      db.collection("orders").countDocuments(),
      db.collection("users").countDocuments(),
      db.collection("bookings").countDocuments(),
      db.collection("carrentalbookings").countDocuments(),
      db.collection("categories").find().toArray(),
      db.collection("orders").aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]).toArray(),
      db.collection("bookings").aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]).toArray(),
      db.collection("carrentalbookings").aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]).toArray(),
      db.collection("orders").aggregate([
        {
          $group: {
            _id: "$email",
            name: { $first: "$name" },
            city: { $first: "$city" },
            country: { $first: "$country" },
            orderCount: { $sum: 1 }
          }
        },
        { $sort: { orderCount: -1 } },
        { $limit: 5 },
        { $project: { 
            email: "$_id",
            name: 1,
            city: 1,
            country: 1,
            orderCount: 1,
            _id: 0
          }
        }
      ]).toArray(),
      db.collection("bookings").aggregate([
        {
          $group: {
            _id: "$productName",
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]).toArray(),
      db.collection("carrentalbookings").aggregate([
        {
          $group: {
            _id: "$carName",
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]).toArray(),
      db.collection("bookings").aggregate([
        {
          $project: {
            durationDays: {
              $divide: [
                { $subtract: ["$endDate", "$startDate"] },
                1000 * 60 * 60 * 24
              ]
            }
          }
        },
        {
          $group: {
            _id: null,
            avgDuration: { $avg: "$durationDays" },
            minDuration: { $min: "$durationDays" },
            maxDuration: { $max: "$durationDays" }
          }
        }
      ]).toArray(),
      db.collection("carrentalbookings").aggregate([
        {
          $project: {
            durationDays: {
              $divide: [
                { $subtract: ["$endDate", "$startDate"] },
                1000 * 60 * 60 * 24
              ]
            }
          }
        },
        {
          $group: {
            _id: null,
            avgDuration: { $avg: "$durationDays" },
            minDuration: { $min: "$durationDays" },
            maxDuration: { $max: "$durationDays" }
          }
        }
      ]).toArray(),
      // For recent orders, only get those after the last fetch time
      db.collection("orders")
        .find({ createdAt: { $gt: lastFetchTime } })
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray(),
      // For recent bookings, only get those after the last fetch time
      db.collection("bookings")
        .find({ createdAt: { $gt: lastFetchTime } })
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray(),
      // For recent rentals, only get those after the last fetch time
      db.collection("carrentalbookings")
        .find({ createdAt: { $gt: lastFetchTime } })
        .sort({ createdAt: -1 })
        .limit(5)
        .toArray()
    ]);

    // Process category data
    const categoryData = await Promise.all(
      categories.map(async (category) => {
        const count = await db.collection("products").countDocuments({
          category: category._id,
        });
        return { name: category.name, count };
      })
    );

    // Format recent activities
    const recentActivities = [
      ...recentOrders.map(order => ({
        type: 'order',
        title: 'New Order',
        message: `Order #${order.orderNumber} by ${order.name}`,
        createdAt: order.createdAt,
        metadata: { orderId: order._id }
      })),
      ...recentBookings.map(booking => ({
        type: 'booking',
        title: 'New Booking',
        message: `Booking for ${booking.productName}`,
        createdAt: booking.createdAt,
        metadata: { bookingId: booking._id }
      })),
      ...recentRentals.map(rental => ({
        type: 'rental',
        title: 'New Rental',
        message: `Rental for ${rental.carName}`,
        createdAt: rental.createdAt,
        metadata: { rentalId: rental._id }
      }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

    // Emit new activities via socket if there are any and if socket is initialized
    if (recentActivities.length > 0 && res.socket.server.io) {
      res.socket.server.io.emit('newActivities', recentActivities);
    }

    // Send response with all data
    res.status(200).json({ 
      categoriesCount, 
      productsCount, 
      ordersCount, 
      usersCount, 
      bookingsCount,
      rentalsCount,
      categoryData, 
      ordersPerDay,
      bookingsPerDay,
      rentalsPerDay,
      topBuyers,
      mostBookedProducts,
      mostRentedCars,
      bookingDuration: bookingDurationStats[0] || {
        avgDuration: 0,
        minDuration: 0,
        maxDuration: 0
      },
      rentalDuration: rentalDurationStats[0] || {
        avgDuration: 0,
        minDuration: 0,
        maxDuration: 0
      },
      totalRevenueSources: {
        orders: ordersCount,
        bookings: bookingsCount,
        rentals: rentalsCount
      },
      recentActivities,
      timestamp: new Date().getTime()
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message 
    });
  }
}