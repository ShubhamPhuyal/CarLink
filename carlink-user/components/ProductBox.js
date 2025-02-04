import styled from "styled-components";

const ProductWrapper = styled.div`
  background-color: #ffff;
  border-radius: 8px;
  padding: 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 160px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  img {
    max-width: 100%;
    max-height: 140px;
    object-fit: contain;
  }
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 1rem;
  color: #333;
  margin: 0 0 8px 0;
  text-align: left;
  width: 100%;
`;

const ProductInfoBox = styled.div`
  width: 100%;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #666;
`;

const BookNowButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #fff;
  color: #0066cc;
  border: 1px solid #0066cc;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f8ff;
  }
`;

export default function ProductWhiteBox({ _id, title, description, price, images }) {
  return (
    <ProductWrapper>
      <WhiteBox>
        <div>
          {images && images[0] ? (
            <img src={`http://localhost:3000${images[0]}`} alt={title} />
          ) : (
            <p>No image available</p>
          )}
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title>{title}</Title>
        <PriceRow>
          <div>Price: NPRs {price} lakhs</div>
        </PriceRow>
        <BookNowButton>Book Now</BookNowButton>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
