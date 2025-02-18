import NewParts from "./NewParts";
import ProductBox from "./ProductBox";
import styled from "styled-components";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
export default function PartList({ products }) {
  return (
    <>
    <StyledProductsGrid>
        {products?.length > 0 &&
            products.map((product) => (
            <NewParts key={product._id} {...product} category={product.category} />
            ))}
    </StyledProductsGrid>

    </>
  );
}
