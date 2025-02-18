import NewParts from "./NewParts";
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
    <StyledProductsGrid>
      {products?.length > 0 && <NewParts key="newPartsSection" products={products} />}
    </StyledProductsGrid>
  );
}
