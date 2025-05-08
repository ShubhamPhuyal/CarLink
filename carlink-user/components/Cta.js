import styled from "styled-components";
import Center from "./Center";

const CTAGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CTACard = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  cursor: pointer;
`;

const CardBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3));
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
`;

const CardTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 8px;
`;

const CardSubtitle = styled.p`
  font-size: 1rem;
  margin: 0;
  margin-bottom: 24px;
  opacity: 0.9;
`;

const GetStartedButton = styled.button`
  display: inline-flex;
  align-items: center;
  background: white;
  color: black;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  svg {
    margin-left: 8px;
  }
`;

export default function Cta() {
  return (
    <Center>
      <CTAGrid>
        <CTACard>
          <CardBackground image="Car1.png" />
          <CardContent>
            <CardTitle>Are You Looking<br />For a Car ?</CardTitle>
            <CardSubtitle>We are committed to providing our customers with exceptional service.</CardSubtitle>
            <a href="/products">
              <GetStartedButton>
                Get Started
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </GetStartedButton>
            </a>
          </CardContent>
        </CTACard>

        <CTACard>
          <CardBackground image="car2.png" />
          <CardContent>
            <CardTitle>Do You Want to<br />Buy car Parts?</CardTitle>
            <CardSubtitle>We are committed to providing our customers with exceptional service.</CardSubtitle>
            <a href="/car-parts">
              <GetStartedButton>
                Get Started
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </GetStartedButton>
            </a>
          </CardContent>
        </CTACard>
      </CTAGrid>
    </Center>
  );
}