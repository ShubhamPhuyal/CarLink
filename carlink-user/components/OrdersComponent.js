import React, { useState } from "react";
import styled from "styled-components";
import { FaShoppingBag, FaCalendarAlt, FaCar, FaKey, FaClipboardList, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Tab Navigation
const TabContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 0.5rem 0.5rem 0 0;
  border: 1px solid #e5e7eb;
  border-bottom: none;
  overflow: hidden;
  margin-top: 1.5rem;
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background-color: ${props => props.active ? '#f3f4f6' : 'white'};
  border: none;
  font-weight: ${props => props.active ? '600' : '500'};
  color: ${props => props.active ? '#111827' : '#6b7280'};
  cursor: pointer;
  flex: 1;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#f3f4f6' : '#f9fafb'};
  }

  &:not(:last-child) {
    border-right: 1px solid #e5e7eb;
  }
`;

const BadgeCount = styled.span`
  background-color: ${props => props.active ? '#4f46e5' : '#e5e7eb'};
  color: ${props => props.active ? 'white' : '#6b7280'};
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  margin-left: 0.5rem;
`;

const InfoSection = styled.div`
  background-color: white;
  border-radius: 0 0 0.5rem 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-top: none;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OrderCards = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const OrderCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

const OrderHeader = styled.div`
  background-color: #f9fafb;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
`;

const OrderContent = styled.div`
  padding: 1rem;
`;

const ShippingSection = styled.div`
  margin-bottom: 1rem;
`;

const SectionLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const ShippingInfo = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
`;

const ProductsList = styled.div`
  margin-top: 1rem;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ProductName = styled.span`
  font-size: 0.875rem;
  color: #111827;
`;

const ProductQuantity = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const BookingCard = styled(OrderCard)``;

const BookingHeader = styled.div`
  background-color: #f0f9ff;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RentalHeader = styled.div`
  background-color: #fff5f5;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

const DateRow = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const DateLabel = styled.span`
  font-weight: 500;
  color: #4b5563;
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #6b7280;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px dashed #e5e7eb;
`;

const EmptyStateIcon = styled.div`
  font-size: 2rem;
  color: #d1d5db;
  margin-bottom: 1rem;
`;

// Status Badges
const OrderStatusBadge = styled.span`
  background-color: ${props => 
    props.status === 'cancelled' ? '#fef2f2' : 
    props.status === 'processing' ? '#eff6ff' : 
    props.status === 'shipped' ? '#ecfdf5' :
    props.status === 'delivered' ? '#f0fdf4' :
    props.status === 'refunded' ? '#fff7ed' :
    '#f3f4f6'};
  color: ${props => 
    props.status === 'cancelled' ? '#dc2626' : 
    props.status === 'processing' ? '#1d4ed8' : 
    props.status === 'shipped' ? '#047857' :
    props.status === 'delivered' ? '#15803d' :
    props.status === 'refunded' ? '#9a3412' :
    '#4b5563'};
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: capitalize;
`;

const BookingStatusBadge = styled.span`
  background-color: ${props => 
    props.status === 'cancelled' ? '#fef2f2' : 
    props.status === 'confirmed' ? '#ecfdf5' : 
    '#eff6ff'};
  color: ${props => 
    props.status === 'cancelled' ? '#dc2626' : 
    props.status === 'confirmed' ? '#10b981' : 
    '#3b82f6'};
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: capitalize;
`;

const RentalStatusBadge = styled.span`
  background-color: ${props => 
    props.status === 'cancelled' ? '#fef2f2' : 
    props.status === 'confirmed' ? '#ecfdf5' : 
    props.status === 'completed' ? '#f5f3ff' :
    '#eff6ff'};
  color: ${props => 
    props.status === 'cancelled' ? '#dc2626' : 
    props.status === 'confirmed' ? '#10b981' : 
    props.status === 'completed' ? '#8b5cf6' :
    '#3b82f6'};
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-transform: capitalize;
`;

// Cancel Button
const CancelButton = styled.button`
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #fee2e2;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f3f4f6;
    color: #6b7280;
    border-color: #e5e7eb;
  }
`;

// Confirmation Dialog
const ConfirmationDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DialogContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DialogTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
`;

const DialogMessage = styled.p`
  margin-bottom: 1.5rem;
  color: #4b5563;
`;

const DialogButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const DialogButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &.cancel {
    background-color: #f3f4f6;
    color: #4b5563;
    border: 1px solid #e5e7eb;

    &:hover {
      background-color: #e5e7eb;
    }
  }

  &.confirm {
    background-color: #dc2626;
    color: white;
    border: 1px solid #dc2626;

    &:hover {
      background-color: #b91c1c;
    }
  }
`;

// Pagination component
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 0.25rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  background-color: ${props => props.active ? '#4f46e5' : 'white'};
  color: ${props => props.active ? 'white' : '#4b5563'};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : '1'};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${props => props.active ? '#4f46e5' : '#f9fafb'};
  }
`;

const PageInfo = styled.div`
  margin: 0 0.75rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const OrdersComponent = ({ orders: initialOrders, bookings: initialBookings, carRentals: initialCarRentals }) => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState(initialOrders);
  const [bookings, setBookings] = useState(initialBookings);
  const [carRentals, setCarRentals] = useState(initialCarRentals);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToCancel, setItemToCancel] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelType, setCancelType] = useState(null); // 'order', 'booking', or 'rental'
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCancelClick = (id, type) => {
    setItemToCancel(id);
    setCancelType(type);
    setShowConfirmation(true);
  };

  const handleCancelConfirmation = async () => {
    if (!itemToCancel || !cancelType) return;

    setIsCancelling(true);
    try {
      let endpoint;
      switch (cancelType) {
        case 'order':
          endpoint = '/api/orders';
          break;
        case 'booking':
          endpoint = '/api/bookings';
          break;
        case 'rental':
          endpoint = '/api/car-rental-bookings';
          break;
        default:
          return;
      }

      const response = await fetch(`${endpoint}?id=${itemToCancel}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        switch (cancelType) {
          case 'order':
            setOrders(orders.map(item => item._id === itemToCancel ? updatedItem : item));
            break;
          case 'booking':
            setBookings(bookings.map(item => item._id === itemToCancel ? updatedItem : item));
            break;
          case 'rental':
            setCarRentals(carRentals.map(item => item._id === itemToCancel ? updatedItem : item));
            break;
        }
        setShowConfirmation(false);
      } else {
        console.error('Failed to cancel item');
      }
    } catch (error) {
      console.error('Error cancelling item:', error);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleCancelDialogClose = () => {
    setShowConfirmation(false);
    setItemToCancel(null);
    setCancelType(null);
  };

  const canCancelOrder = (order) => {
    // Don't show cancel button for delivered, completed, or cancelled orders
    return ['pending', 'processing'].includes(order.status) && 
           !['delivered', 'completed', 'cancelled'].includes(order.status);
  };

  const canCancelBooking = (booking) => {
    // Don't show cancel button for completed or cancelled bookings
    return ['pending', 'confirmed'].includes(booking.status) && 
           !['completed', 'cancelled'].includes(booking.status);
  };

  const canCancelRental = (rental) => {
    // Don't show cancel button for completed or cancelled rentals  
    return ['pending', 'confirmed'].includes(rental.status) && 
           !['completed', 'cancelled'].includes(rental.status);
  };

  // Pagination logic
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    switch (activeTab) {
      case 'orders':
        return orders.slice(startIndex, endIndex);
      case 'bookings':
        return bookings.slice(startIndex, endIndex);
      case 'rentals':
        return carRentals.slice(startIndex, endIndex);
      default:
        return [];
    }
  };

  const getCurrentCollection = () => {
    switch (activeTab) {
      case 'orders':
        return orders;
      case 'bookings':
        return bookings;
      case 'rentals':
        return carRentals;
      default:
        return [];
    }
  };

  const totalPages = Math.ceil(getCurrentCollection().length / itemsPerPage);

  // Reset to first page when changing tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <>
      <TabContainer>
        <TabButton 
          active={activeTab === "orders"} 
          onClick={() => handleTabChange("orders")}
        >
          <FaShoppingBag />
          Orders
          <BadgeCount active={activeTab === "orders"}>{orders.length}</BadgeCount>
        </TabButton>
        <TabButton 
          active={activeTab === "bookings"} 
          onClick={() => handleTabChange("bookings")}
        >
          <FaCar />
          Bookings
          <BadgeCount active={activeTab === "bookings"}>{bookings.length}</BadgeCount>
        </TabButton>
        <TabButton 
          active={activeTab === "rentals"} 
          onClick={() => handleTabChange("rentals")}
        >
          <FaKey />
          Rentals
          <BadgeCount active={activeTab === "rentals"}>{carRentals.length}</BadgeCount>
        </TabButton>
      </TabContainer>

      <InfoSection>
        {activeTab === "orders" && (
          <>
            <SectionTitle>
              <FaClipboardList style={{ marginRight: '0.5rem' }} />
              Order History
            </SectionTitle>
            
            {orders.length > 0 ? (
              <>
                <OrderCards>
                  {getCurrentItems().map((order) => (
                    <OrderCard key={order._id}>
                      <OrderHeader>
                        <OrderDate>
                          <FaCalendarAlt />
                          {formatDate(order.createdAt)}
                        </OrderDate>
                        <OrderStatusBadge status={order.status}>
                          {order.status}
                        </OrderStatusBadge>
                      </OrderHeader>
                      <OrderContent>
                        <ShippingSection>
                          <SectionLabel>Shipping Information</SectionLabel>
                          <ShippingInfo>
                            {order.name}<br />
                            {order.streetAddress}<br />
                            {order.city}, {order.postalCode}<br />
                            {order.country}
                          </ShippingInfo>
                        </ShippingSection>
                        
                        <SectionLabel>Products</SectionLabel>
                        <ProductsList>
                          {order.line_items.map((item, index) => (
                            <ProductItem key={index}>
                              <ProductName>{item.price_data?.product_data.name}</ProductName>
                              <ProductQuantity>x{item.quantity}</ProductQuantity>
                            </ProductItem>
                          ))}
                        </ProductsList>

                        {canCancelOrder(order) && (
                          <CancelButton 
                            onClick={() => handleCancelClick(order._id, 'order')}
                            disabled={isCancelling && itemToCancel === order._id}
                          >
                            <FaTimes />
                            Cancel Order
                          </CancelButton>
                        )}
                      </OrderContent>
                    </OrderCard>
                  ))}
                </OrderCards>
                
                {totalPages > 1 && (
                  <PaginationContainer>
                    <PageButton 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <FaChevronLeft />
                    </PageButton>
                    
                    <PageInfo>
                      Page {currentPage} of {totalPages}
                    </PageInfo>
                    
                    <PageButton 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <FaChevronRight />
                    </PageButton>
                  </PaginationContainer>
                )}
              </>
            ) : (
              <EmptyState>
                <EmptyStateIcon><FaShoppingBag /></EmptyStateIcon>
                <p>You haven't placed any orders yet.</p>
              </EmptyState>
            )}
          </>
        )}

        {activeTab === "bookings" && (
          <>
            <SectionTitle>
              <FaCar style={{ marginRight: '0.5rem' }} />
              Car Bookings
            </SectionTitle>
            
            {bookings.length > 0 ? (
              <>
                <OrderCards>
                  {getCurrentItems().map((booking) => (
                    <BookingCard key={booking._id}>
                      <BookingHeader>
                        <OrderDate>
                          <FaCalendarAlt />
                          {formatDate(booking.createdAt)}
                        </OrderDate>
                        <BookingStatusBadge status={booking.status}>
                          {booking.status}
                        </BookingStatusBadge>
                      </BookingHeader>
                      <OrderContent>
                        <ProductName style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.75rem' }}>
                          {booking.productName}
                        </ProductName>
                        
                        <DateInfo>
                          <DateRow>
                            <DateLabel>From:</DateLabel>
                            {formatDate(booking.startDate)}
                          </DateRow>
                          <DateRow>
                            <DateLabel>To:</DateLabel>
                            {formatDate(booking.endDate)}
                          </DateRow>
                        </DateInfo>

                        <ShippingSection style={{ marginTop: '1rem' }}>
                          <SectionLabel>Contact Information</SectionLabel>
                          <ShippingInfo>
                            {booking.name}<br />
                            {booking.phone}<br />
                            {booking.address}
                          </ShippingInfo>
                        </ShippingSection>

                        {canCancelBooking(booking) && (
                          <CancelButton 
                            onClick={() => handleCancelClick(booking._id, 'booking')}
                            disabled={isCancelling && itemToCancel === booking._id}
                          >
                            <FaTimes />
                            Cancel Booking
                          </CancelButton>
                        )}
                      </OrderContent>
                    </BookingCard>
                  ))}
                </OrderCards>
                
                {totalPages > 1 && (
                  <PaginationContainer>
                    <PageButton 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <FaChevronLeft />
                    </PageButton>
                    
                    <PageInfo>
                      Page {currentPage} of {totalPages}
                    </PageInfo>
                    
                    <PageButton 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <FaChevronRight />
                    </PageButton>
                  </PaginationContainer>
                )}
              </>
            ) : (
              <EmptyState>
                <EmptyStateIcon><FaCar /></EmptyStateIcon>
                <p>You haven't made any car bookings yet.</p>
              </EmptyState>
            )}
          </>
        )}

        {activeTab === "rentals" && (
          <>
            <SectionTitle>
              <FaKey style={{ marginRight: '0.5rem' }} />
              Car Rentals
            </SectionTitle>
            
            {carRentals.length > 0 ? (
              <>
                <OrderCards>
                  {getCurrentItems().map((rental) => (
                    <BookingCard key={rental._id}>
                      <RentalHeader>
                        <OrderDate>
                          <FaCalendarAlt />
                          {formatDate(rental.createdAt)}
                        </OrderDate>
                        <RentalStatusBadge status={rental.status}>
                          {rental.status}
                        </RentalStatusBadge>
                      </RentalHeader>
                      <OrderContent>
                        <ProductName style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.75rem' }}>
                          {rental.carName}
                        </ProductName>
                        
                        <DateInfo>
                          <DateRow>
                            <DateLabel>From:</DateLabel>
                            {formatDate(rental.startDate)}
                          </DateRow>
                          <DateRow>
                            <DateLabel>To:</DateLabel>
                            {formatDate(rental.endDate)}
                          </DateRow>
                        </DateInfo>

                        <ShippingSection style={{ marginTop: '1rem' }}>
                          <SectionLabel>Contact Information</SectionLabel>
                          <ShippingInfo>
                            {rental.name}<br />
                            {rental.phone}<br />
                            {rental.address}
                          </ShippingInfo>
                        </ShippingSection>

                        {canCancelRental(rental) && (
                          <CancelButton 
                            onClick={() => handleCancelClick(rental._id, 'rental')}
                            disabled={isCancelling && itemToCancel === rental._id}
                          >
                            <FaTimes />
                            Cancel Rental
                          </CancelButton>
                        )}
                      </OrderContent>
                    </BookingCard>
                  ))}
                </OrderCards>
                
                {totalPages > 1 && (
                  <PaginationContainer>
                    <PageButton 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <FaChevronLeft />
                    </PageButton>
                    
                    <PageInfo>
                      Page {currentPage} of {totalPages}
                    </PageInfo>
                    
                    <PageButton 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <FaChevronRight />
                    </PageButton>
                  </PaginationContainer>
                )}
              </>
            ) : (
              <EmptyState>
                <EmptyStateIcon><FaKey /></EmptyStateIcon>
                <p>You haven't made any car rental reservations yet.</p>
              </EmptyState>
            )}
          </>
        )}
      </InfoSection>

      {showConfirmation && (
        <ConfirmationDialog>
          <DialogContent>
            <DialogTitle>Cancel {cancelType === 'order' ? 'Order' : cancelType === 'booking' ? 'Booking' : 'Rental'}</DialogTitle>
            <DialogMessage>
              Are you sure you want to cancel this {cancelType}? This action cannot be undone.
            </DialogMessage>
            <DialogButtons>
              <DialogButton 
                className="cancel" 
                onClick={handleCancelDialogClose}
                disabled={isCancelling}
              >
                No, Keep It
              </DialogButton>
              <DialogButton 
                className="confirm" 
                onClick={handleCancelConfirmation}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </DialogButton>
            </DialogButtons>
          </DialogContent>
        </ConfirmationDialog>
      )}
    </>
  );
};

export default OrdersComponent;