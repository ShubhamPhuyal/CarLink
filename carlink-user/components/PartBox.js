import Link from "next/link";
import styled from "styled-components";
import { FaPalette, FaWeightHanging, FaWrench } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { toast } from 'react-toastify';

const PartWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  height: 160px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;

  img {
    max-width: 100%;
    max-height: 140px;
    object-fit: contain;
  }
`;

const Title = styled(Link)`
  display: block;
  font-weight: 700;
  font-size: 1rem;
  color: #333;
  text-decoration: none;
  text-align: left;
  width: 100%;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const PartInfoBox = styled.div`
  width: 100%;
`;

const PropertiesBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eee;
  width: 100%;
`;

const PropertyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #444;
  flex: 1;

  svg {
    width: 18px;
    height: 18px;
    color: #0066cc;
  }

  &:nth-child(1) {
    justify-content: flex-start;
  }

  &:nth-child(2) {
    justify-content: center;
  }

  &:nth-child(3) {
    justify-content: flex-end;
  }
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #222;
`;

const BookNowButton = styled.button`
  padding: 10px 14px;
  background-color: #0066cc;
  color: #fff;
  font-size: 0.95rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #004d99;
  }
`;

export default function PartBox({ _id, title, price, images, properties }) {
  const url = "/part/" + _id;
  const { addProduct } = useContext(CartContext);

  const propertyData = properties && properties[0] ? properties[0] : {};

  const handleAddToCart = () => {
    addProduct(_id);
    toast.success(`🛒 ${title} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <PartWrapper>
      <WhiteBox href={url}>
        <div>
          {images && images[0] ? (
            <img src={`http://localhost:3000${images[0]}`} alt={title} />
          ) : (
            <p>No image available</p>
          )}
        </div>
      </WhiteBox>
      <PartInfoBox>
        <Title href={url}>{title}</Title>

        {propertyData && (
          <PropertiesBox>
            {propertyData.Color && (
              <PropertyItem>
                <FaPalette /> {propertyData.Color}
              </PropertyItem>
            )}
            {propertyData.Weight && (
              <PropertyItem>
                <FaWeightHanging /> {propertyData.Weight}
              </PropertyItem>
            )}
            {propertyData.Condition && (
              <PropertyItem>
                <FaWrench /> {propertyData.Condition}
              </PropertyItem>
            )}
          </PropertiesBox>
        )}

        <PriceRow>
          <Price>Rs {price}</Price>
          <BookNowButton onClick={handleAddToCart}>
            Add to Cart
          </BookNowButton>
        </PriceRow>
      </PartInfoBox>
    </PartWrapper>
  );
}