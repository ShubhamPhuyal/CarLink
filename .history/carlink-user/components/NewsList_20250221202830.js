import Center from "./Center";
import NewsBox from "./NewsBox";// Use PartBox directly instead of NewParts
import styled from "styled-components";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15x;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default function NewsList({ products }) {
  return (
    <Center>
      <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product) => (
          <NewsBox key={product._id} {...product} />
        ))}
    </StyledProductsGrid>
    </Center>
    
  );
}