import NewsBox from "./NewsBox";
import styled from "styled-components";

const StyledProductsGrid = styled.div`
  display: grid;
  margin-left: 30px;
  grid-template-columns: repeat(3, 1fr); // First three items in a row
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); // Maintain three columns for larger screens
  }

  // Ensure the fourth and subsequent items span all columns
  & > :nth-child(n + 4) {
    grid-column: 1 / -1; // Make subsequent items take the full width
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
