import styled from "styled-components";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductImageContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const BigImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 450px;
  background: transparent;
  border-radius: 8px;
  overflow: visible; /* Changed from hidden to visible */
  margin-bottom: 20px;
`;

const BigImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensures the whole image is visible without cutting off */
  transition: transform 0.3s ease;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10; /* Ensure it appears above everything */

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  ${props => props.position === 'left' ? 'left: -60px;' : 'right: -60px;'}

  @media screen and (max-width: 768px) {
    ${props => props.position === 'left' ? 'left: -30px;' : 'right: -30px;'}
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
  padding: 0 30px;
`;

const Thumbnail = styled.div`
  width: 150px;
  height: 70px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.6};
  border: 2px solid ${props => props.active ? '#EFEFEF' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Ensures the entire image is displayed within the thumbnail */
  }
`;

export default function ProductImages({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const goToNextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <ProductImageContainer>
      <BigImageWrapper>
        <NavigationButton position="left" onClick={goToPrevImage}>
          <ChevronLeft size={24} />
        </NavigationButton>
        <BigImage src={activeImage} alt="Product" />
        <NavigationButton position="right" onClick={goToNextImage}>
          <ChevronRight size={24} />
        </NavigationButton>
      </BigImageWrapper>
      
      <ThumbnailContainer>
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </Thumbnail>
        ))}
      </ThumbnailContainer>
    </ProductImageContainer>
  );
}
