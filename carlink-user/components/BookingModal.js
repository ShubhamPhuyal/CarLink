import { useState } from 'react';
import styled from 'styled-components';

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

export default function BookingModal({ 
  productName, 
  productId, 
  onClose, 
  onSubmit 
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      productId,
      productName,
      ...formData
    });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Book {productName}</h2>
        <form onSubmit={handleSubmit}>
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
            <Label>Email</Label>
            <Input 
              type="email" 
              name="email" 
              value={formData.email}
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
            <Label>Start Date</Label>
            <Input 
              type="date" 
              name="startDate" 
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>End Date</Label>
            <Input 
              type="date" 
              name="endDate" 
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          
          <div>
            <SubmitButton type="submit">Confirm Booking</SubmitButton>
            <CloseButton type="button" onClick={onClose}>
              Cancel
            </CloseButton>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}