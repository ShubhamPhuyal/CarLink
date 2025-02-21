import NewsBox from "./NewsBox";
import styled from "styled-components";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // First three items in a row
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); // Maintain three columns for larger screens
  }

  // Add a specific style for items after the first three
  & > :nth-child(n + 4) {
    grid-column: span 2; // Make the subsequent items take up two columns
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
