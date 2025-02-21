import Link from "next/link";
import styled from "styled-components";
import { FaGasPump, FaRoad, FaCog } from "react-icons/fa";

const ProductWrapper = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 16px;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const WhiteBox = styled(Link)`
  background-color: #f8f9fa;
  border-radius: 12px;
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover img {
    transform: scale(1.05);
  }

  img {
    max-width: 100%;
    max-height: 180px;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
`;

const Title = styled(Link)`
  display: block;
  font-weight: 700;
  font-size: 1.1rem;
  color: #1a1a1a;
  text-decoration: none;
  text-align: left;
  width: 100%;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
  transition: color 0.2s ease;

  &:hover {
    color: #0066cc;
  }
`;

const ProductInfoBox = styled.div`
  width: 100%;
`;

const PropertiesBox = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 18px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 12px;
`;

const PropertyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #555;
  padding: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
    color: #0066cc;
  }
`;

const PropertyLabel = styled.span`
  font-weight: 500;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const PriceLabel = styled.span`
  font-size: 0.85rem;
  color: #666;
  font-weight: 400;
`;

const BookNowButton = styled.button`
  padding: 12px 24px;
  background-color: #0066cc;
  color: #fff;
  font-size: 0.95rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #005ab8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function ProductBox({ _id, title, description, price, images, properties }) {
  const url = "/product/" + _id;
  const propertyData = properties && properties[0] ? properties[0] : {};

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          {images && images[0] ? (
            <img src={`http://localhost:3000${images[0]}`} alt={title} />
          ) : (
            <p>No image available</p>
          )}
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>

        {propertyData && (
          <PropertiesBox>
            {propertyData.Fuel && (
              <PropertyItem>
                <FaGasPump />
                <PropertyLabel>{propertyData.Fuel}</PropertyLabel>
              </PropertyItem>
            )}
            {propertyData.Miles && (
              <PropertyItem>
                <FaRoad />
                <PropertyLabel>{propertyData.Miles}</PropertyLabel>
              </PropertyItem>
            )}
            {propertyData.Transmission && (
              <PropertyItem>
                <FaCog />
                <PropertyLabel>{propertyData.Transmission}</PropertyLabel>
              </PropertyItem>
            )}
          </PropertiesBox>
        )}

        <PriceRow>
          <Price>
            <PriceLabel>Starting from</PriceLabel>
            {price}
          </Price>
          <BookNowButton>Book Now</BookNowButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}