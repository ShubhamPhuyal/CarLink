import NewsBox from "./NewsBox";
import styled from "styled-components";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Three items per row
  gap: 20px;

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
    grid-column: 1; // Place the fourth item in the first column
  }

  // Add a specific style for items after the fourth
  & > :nth-child(n + 5) {
    grid-column: span 3; // Subsequent items can span all columns or adjust as needed
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
