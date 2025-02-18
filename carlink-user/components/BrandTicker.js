import styled from "styled-components";
import Center from "./Center";

const BrandTickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-top: 40px;
  padding-bottom: 20px;
`;

const BrandLogo = styled.img`
  width: 60px; /* Reduced from 100px for more balanced appearance */
  height: 60px;
  object-fit: contain;
  padding: 8px; /* Added padding to give space for larger logos with text */
  
  /* Specific adjustments for logos with text */
  &[src*="Tesla"] {
    width: 120px; /* Wider for text-based logo */
    height: 40px; /* Shorter height for better proportion */
  }
  
  &[src*="McLaren"] {
    width: 100px;
    height: 40px;
  }
  
  /* Keep symbol-only logos square */
  &[src*="Suzuki"] {
    width: 60px;
    height: 60px;
  }

  &[src*="Bentley"] {
    width: 90px;
    height: 40px;
  }   
  
  &[src*="Ford"] {
    width: 90px;
    height: 40px;
  }

   &[src*="Infiniti"] {
    width: 75px;
    height: 40px;
  }
`;

// Style for the h2 to center it


export default function BrandTicker() {
  return (
    <Center>
      
      <BrandTickerContainer>
        <BrandLogo src="Tesla.svg" alt="Tesla" />
        <BrandLogo src="Ford.svg" alt="Ford" />
        <BrandLogo src="Bentley.svg" alt="Bentley" />
        <BrandLogo src="McLaren.svg" alt="McLaren" />
        <BrandLogo src="Suzuki.svg" alt="Suzuki" />
        <BrandLogo src="Infiniti.svg" alt="Suzuki" />
        <BrandLogo src="Jeep.svg" alt="Suzuki" />
      </BrandTickerContainer>
    </Center>
  );
}
