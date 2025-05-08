import ProductBox from "./ProductBox";
import styled from "styled-components";
import RentBox from "./RentBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
export default function RentList({ products }) {
  return (
    <>
    <StyledProductsGrid>
        {products?.length > 0 &&
            products.map((product) => (
            <RentBox key={product._id} {...product} category={product.category} />
            ))}
    </StyledProductsGrid>

    </>
  );
}
