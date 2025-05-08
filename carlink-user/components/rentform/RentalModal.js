import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from 'react-toastify';
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const SubmitButton = styled.button`
  background-color: #0066cc;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
`;

const CloseButton = styled.button`
  background-color: #ccc;
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const DateRangeDisplay = styled.div`
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #555;
`;

const UserEmailDisplay = styled.div`
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

export default function RentalModal({ 
  show, 
  onClose, 
  carId, 
  carName, 
  price 
}) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    phone: "",
    address: "",
    startDate: "",
    endDate: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.user?.name) {
      setFormData(prev => ({ ...prev, name: session.user.name }));
    }
  }, [session]);

  const calculateRentalDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    const days = calculateRentalDays();
    return days * price;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleRentalSubmit = async (e) => {
    e.preventDefault();
    
    if (!session) {
      setError("Please sign in to rent a car");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('/api/car-rental-bookings', {
        carId,
        carName,
        price,
        email: session.user.email, // Using logged-in user's email
        userId: session.user.id,   // Including user ID
        startDate: formData.startDate,
        endDate: formData.endDate,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        totalPrice: calculateTotalPrice(),
        rentalDays: calculateRentalDays()
      });

      if (response.status === 201) {
        onClose();
        toast.success('🚗 Rental booked successfully! We will contact you shortly.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
          name: session.user.name || "",
          phone: "",
          address: "",
          startDate: "",
          endDate: ""
        });
      } else {
        throw new Error(response.data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Rental booking error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to book rental. Please try again.';
      setError(errorMsg);
      toast.error(`❌ ${errorMsg}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Rent {carName}</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {session?.user?.email && (
          <UserEmailDisplay>
            Renting as: {session.user.email}
          </UserEmailDisplay>
        )}
        
        {!session && (
          <ErrorMessage>
            You need to be signed in to rent a car.
          </ErrorMessage>
        )}

        <form onSubmit={handleRentalSubmit}>
          <FormGroup>
            <Label>Full Name</Label>
            <Input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Phone Number</Label>
            <Input 
              type="tel" 
              name="phone" 
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Address</Label>
            <Input 
              type="text" 
              name="address" 
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Pickup Date</Label>
            <Input 
              type="date" 
              name="startDate" 
              value={formData.startDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Return Date</Label>
            <Input 
              type="date" 
              name="endDate" 
              value={formData.endDate}
              onChange={handleInputChange}
              min={formData.startDate || new Date().toISOString().split('T')[0]}
              required
            />
          </FormGroup>

          <DateRangeDisplay>
            {formData.startDate && formData.endDate && (
              <>
                <div>Rental Duration: {calculateRentalDays()} days</div>
                <div>Total Price: ${calculateTotalPrice()}</div>
              </>
            )}
          </DateRangeDisplay>
          
          <div>
            <SubmitButton 
              type="submit" 
              disabled={isSubmitting || !session}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Rental'}
            </SubmitButton>
            <CloseButton 
              type="button" 
              onClick={() => {
                onClose();
                setError(null);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </CloseButton>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}