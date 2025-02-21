import Link from "next/link";
import styled from "styled-components";

const PartWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  height: 160px; /* Fixed height */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  overflow: hidden; /* Prevents overflow if image doesn't fit */

  img {
    max-width: 100%; /* Ensure it doesn't exceed the width of the container */
    max-height: 100%; /* Ensure it doesn't exceed the height of the container */
    object-fit: contain; /* Ensure the entire image is visible */
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
  justify-content: space-between; /* Ensures equal spacing */
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eee;
  width: 100%;
`;

const Description = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Limits the text to 3 lines */
  overflow: hidden;
  text-overflow: ellipsis; /* Adds "..." at the end if text overflows */
  font-size: 0.9rem;
  color: #444;
  flex: 1;
  text-align: justify; /* Justifies the text */

  /* Optional: This can help distribute the space more evenly */
  &:after {
    content: '';
    display: inline-block;
    width: 100%; /* This will help to fill the last line properly */
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

export default function NewsBox({ _id, title, description, price, images, properties }) {
  const url = "/product/" + _id;

  // Access properties safely
  const propertyData = properties && properties[0] ? properties[0] : {};

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
            <Description>
              {description}
            </Description>
          </PropertiesBox>
        )}

        <PriceRow>
          <Price>Price: {price}</Price>
          <BookNowButton>Read</BookNowButton>
        </PriceRow>
      </PartInfoBox>
    </PartWrapper>
  );
}
