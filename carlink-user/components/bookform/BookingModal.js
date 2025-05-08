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

const UserEmailDisplay = styled.div`
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

export default function BookingModal({ 
  show, 
  onClose, 
  productId, 
  productName, 
  price 
}) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    phone: "",
    address: "",
    startDate: "",
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (session?.user?.name) {
      setFormData(prev => ({ ...prev, name: session.user.name }));
    }
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[\d\s\-+()]{8,20}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    // Address validation
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
      isValid = false;
    } else if (formData.address.trim().length < 10) {
      errors.address = 'Address should be at least 10 characters';
      isValid = false;
    }

    // Date validations
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
      isValid = false;
    } else {
      const startDate = new Date(formData.startDate);
      if (startDate < today) {
        errors.startDate = 'Start date cannot be in the past';
        isValid = false;
      }
    }

    if (!formData.endDate) {
      errors.endDate = 'End date is required';
      isValid = false;
    } else if (formData.startDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate < startDate) {
        errors.endDate = 'End date must be after start date';
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!session) {
      setError("Please sign in to make a booking");
      return;
    }

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('/api/bookings', {
        productId,
        productName,
        price,
        email: session.user.email,
        userId: session.user.id,
        ...formData
      });

      if (response.status === 201) {
        onClose();
        toast.success('🚀 Booking successful! We will contact you shortly.', {
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
          endDate: "",
        });
      } else {
        throw new Error(response.data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || 'Booking failed. Please try again or contact support.';
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
        <h2>Book {productName}</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {session?.user?.email && (
          <UserEmailDisplay>
            Booking as: {session.user.email}
          </UserEmailDisplay>
        )}
        
        {!session && (
          <ErrorMessage>
            You need to be signed in to make a booking.
          </ErrorMessage>
        )}

        <form onSubmit={handleBookingSubmit}>
          <FormGroup>
            <Label>Full Name</Label>
            <Input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {validationErrors.name && <ErrorMessage>{validationErrors.name}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>Phone Number</Label>
            <Input 
              type="tel" 
              name="phone" 
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="e.g., +1 (123) 456-7890"
            />
            {validationErrors.phone && <ErrorMessage>{validationErrors.phone}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>Address</Label>
            <Input 
              type="text" 
              name="address" 
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Full address including city and postal code"
            />
            {validationErrors.address && <ErrorMessage>{validationErrors.address}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>Start Date</Label>
            <Input 
              type="date" 
              name="startDate" 
              value={formData.startDate}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
            {validationErrors.startDate && <ErrorMessage>{validationErrors.startDate}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>End Date</Label>
            <Input 
              type="date" 
              name="endDate" 
              value={formData.endDate}
              onChange={handleInputChange}
              required
              min={formData.startDate || new Date().toISOString().split('T')[0]}
            />
            {validationErrors.endDate && <ErrorMessage>{validationErrors.endDate}</ErrorMessage>}
          </FormGroup>
          
          <div>
            <SubmitButton 
              type="submit"
              disabled={isSubmitting || !session}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
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