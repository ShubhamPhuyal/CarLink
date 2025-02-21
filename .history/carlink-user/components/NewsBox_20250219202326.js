import Link from "next/link";
import styled from "styled-components";

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
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
`;

const PartInfoBox = styled.div`
  width: 100%;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Show only 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 12px;
`;

const TypeBox = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 14px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 12px;
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

export default function NewsBox({ _id, title, description, images, properties }) {
  const url = "/product/" + _id;

  // Access properties safely
  const type = properties?.Type || "N/A";

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
        <Description>{description}</Description>
        <TypeBox>Type: {type}</TypeBox>
        <PriceRow>
          <BookNowButton>Read</BookNowButton>
        </PriceRow>
      </PartInfoBox>
    </PartWrapper>
  );
}
