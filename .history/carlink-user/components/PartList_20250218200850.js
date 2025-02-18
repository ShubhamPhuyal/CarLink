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
    
          <Slider {...settings}>
            {products.map((product) => (
              <PartBox key={product._id} {...product} />
            )}
          </Slider>
        ) : (
          <p style={{ textAlign: "center", color: "gray" }}>No parts available</p>
        )
    </StyledProductsGrid>

    </>
  );
}
