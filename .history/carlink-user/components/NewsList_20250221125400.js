import NewsBox from "./NewsBox";
import styled from "styled-components";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // First three items in a row
  gap: 20px;
  justify-items: center; // Center items horizontally

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); // Maintain three columns for larger screens
  }

  // Center the first three items
  & > :nth-child(-n + 3) {
    justify-self: center; // Center the first three items
  }

  // Align the fourth item to the left
  & > :nth-child(4) {
    justify-self: start; // Align the fourth item to the left
    grid-column: 1 / 3; // Span the first two columns if needed
  }

  // Add a specific style for items after the fourth
  & > :nth-child(n + 5) {
    grid-column: span 2; // Subsequent items can span two columns or adjust as needed
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
