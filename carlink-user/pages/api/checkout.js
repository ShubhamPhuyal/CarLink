import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

  const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;

  if (!cartProducts || cartProducts.length === 0) {
    return res.status(400).json({ error: "Cart is empty." });
  }

  await mongooseConnect();

  const uniqueIds = [...new Set(cartProducts)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = cartProducts.filter(id => id === productId)?.length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: productInfo.price * 100, // ✅ Fixed: Ensure price is in cents
        },
      });
    }
  }

  if (line_items.length === 0) {
    return res.status(400).json({ error: "No valid products found." });
  }

  try {
    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/cart?success=1`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/cart?canceled=1`,
      metadata: { orderId: orderDoc._id.toString() },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: "Error creating checkout session" });
  }
}
