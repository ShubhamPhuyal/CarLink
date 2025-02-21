import styled from "styled-components";
import Center from "./Center";
import PartBox from "./PartBox";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Title = styled.div`
  padding-top: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Heading = styled.h1`
  font-size: 1.8=rem;
  padding-left:10px;
  margin: 0;
`;

const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #0066cc;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.2s ease;

  &:hover {
    color: #004999;
    transform: translateX(5px);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;

  .slick-slide {
    display: flex;
    justify-content: center;
  }

  .slick-dots {
    bottom: -35px;
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
    infinite: productCount > 1,
    speed: 500,
    slidesToShow: Math.min(productCount, 4),
    slidesToScroll: 1,
    autoplay: productCount > 1,
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
        <ViewAllButton>
          View all Parts
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2"/>
            <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ViewAllButton>
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