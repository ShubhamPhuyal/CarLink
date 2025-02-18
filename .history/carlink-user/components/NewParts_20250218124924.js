import styled from "styled-components";
import Center from "./Center";
import PartBox from "./PartBox"; // Import PartBox instead of ProductBox
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Title = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin: 0;
`;

const Label = styled.label`
  text-align: center;
  font-size: 1.2rem;
  color: grey;
  margin-top: 5px;
`;

const SliderWrapper = styled.div`
  width: 100%;

  .slick-slide {
    display: flex;
    justify-content: center;
  }

  .slick-dots {
    bottom: -20px;
  }

  .slick-dots li button:before {
    font-size: 10px;
    color: #ccc;
  }

  .slick-dots li.slick-active button:before {
    color: #0066cc;
  }
`;

export default function NewParts({ products }) {
  const productCount = products?.length || 0;

  const settings = {
    dots: true,
    infinite: productCount > 1, // Disable infinite scroll if there's only one product
    speed: 500,
    slidesToShow: Math.min(productCount, 4), // Show only available products, max 4
    slidesToScroll: 1,
    autoplay: productCount > 1, // Disable autoplay if only one product
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(productCount, 3) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(productCount, 2) } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Center>
      <Title>
        <Heading>Car Parts & Accessories</Heading>
        <Label>Book them now before they sell out</Label>
      </Title>

      <SliderWrapper>
        {productCount > 0 ? (
          <Slider {...settings}>
            {products.map((product) => (
              <PartBox key={product._id} {...product} />
            ))}
          </Slider>
        ) : (
          <p style={{ textAlign: "center", color: "gray" }}>No parts available</p>
        )}
      </SliderWrapper>
    </Center>
  );
}
