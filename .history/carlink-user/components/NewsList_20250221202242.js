import NewsBox from "./NewsBox"; // Use PartBox directly instead of NewParts
import styled from "styled-components";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Default to 1 column for small screens */
  gap: 20px;
  margin-left: 40px;

  @media screen and (min-width: 576px) {
    grid-template-columns: 1fr 1fr; /* 2 columns for medium screens */
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr; /* 3 columns for larger screens */
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr 1fr; /* 4 columns for extra large screens */
  }
`;

export default function NewsList({ products }) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product) => (
          <NewsBox key={product._id} {...product} />
        ))}
    </StyledProductsGrid>
  );
}
