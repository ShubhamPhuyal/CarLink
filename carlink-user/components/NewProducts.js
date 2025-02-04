import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox"; // Correct import

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Ensures exactly 4 products per row */
  gap: 20px;
  padding-top: 20px;
  justify-items: center; /* Centers the items in the grid */
`;

export default function NewProducts({ products }) {
  return (
    <Center>
      <ProductsGrid>
        {products?.length > 0 && products.map(product => (
          <ProductBox key={product._id} {...product} />
        ))}
      </ProductsGrid>
    </Center>
  );
}
