import styled from "styled-components";
import Center from "./Center";
import Button from "@/components/Button";

const Section = styled.div`
  position: relative;
  overflow: hidden;
  padding: 5rem 0;
  background: linear-gradient(120deg, #f0f4ff 0%, #e6eeff 100%);
  min-height: 600px;
`;

const MeshBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  background: 
    radial-gradient(circle at 10% 20%, rgba(105, 145, 255, 0.2) 0%, transparent 30%),
    radial-gradient(circle at 80% 40%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 40% 70%, rgba(165, 180, 252, 0.18) 0%, transparent 35%),
    radial-gradient(circle at 90% 90%, rgba(79, 70, 229, 0.1) 0%, transparent 25%);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
`;

const GradientBlob = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  right: -250px;
  top: -250px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(165, 180, 252, 0.05) 50%, transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
  z-index: 1;
`;

const LeftContent = styled.div`
  max-width: 550px;
  
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #4B5563;
  margin-bottom: 2rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const NoFees = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FeeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:before {
    content: "•";
    color: #4f46e5;
    font-weight: bold;
  }
`;

const FeeText = styled.span`
  font-size: 1rem;
  color: #6B7280;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(to right, #4f46e5, #7c3aed);
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 20px -3px rgba(79, 70, 229, 0.3);
  }
`;

const ButtonNote = styled.span`
  font-size: 0.875rem;
  color: #6B7280;
  
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const RightContent = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 450px;
  height: 280px;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 400px;
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);
  transition: transform 0.6s ease;
  
  &:hover {
    transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
  }
`;

const GlassCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardLogo = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CardChip = styled.div`
  width: 45px;
  height: 35px;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: "";
    position: absolute;
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 2px;
  }
`;

const CardMiddle = styled.div`
  margin-top: 2rem;
  font-family: monospace;
  font-size: 1.25rem;
  color: white;
  letter-spacing: 2px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardName = styled.div`
  font-size: 0.875rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CardBrand = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CardGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(79, 70, 229, 0.4) 100%);
  z-index: -1;
  border-radius: 16px;
`;

const CardHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
  z-index: -1;
  border-radius: 16px 16px 0 0;
`;

export default function NewsFeatured() {
  return (
    <Section>
      <MeshBackground />
      <GradientBlob />
      
      <Center>
        <ContentWrapper>
          <LeftContent>
            <Heading>Find your perfect ride with ease</Heading>
            <Subtitle>
              Get access to premium vehicles wherever and whenever you need them with our seamless mobile booking system.
            </Subtitle>
            
            <NoFees>
              <FeeItem>
                <FeeText>No hidden fees</FeeText>
              </FeeItem>
              <FeeItem>
                <FeeText>Instant approval</FeeText>
              </FeeItem>
              <FeeItem>
                <FeeText>24/7 support</FeeText>
              </FeeItem>
            </NoFees>
            
            <ButtonWrapper>
              <PrimaryButton>Explore Vehicles</PrimaryButton>
              <ButtonNote>Just takes a minute to get started</ButtonNote>
            </ButtonWrapper>
          </LeftContent>
          
          <RightContent>
            <CardContainer>
              <GlassCard>
                <CardTop>
                  <CardLogo>DrivePass</CardLogo>
                  <CardChip />
                </CardTop>
                
                <CardMiddle>•••• •••• •••• 3456</CardMiddle>
                
                <CardBottom>
                  <CardName>Premium Member</CardName>
                  <CardBrand>PLUS</CardBrand>
                </CardBottom>
                
                <CardGradient />
                <CardHighlight />
              </GlassCard>
            </CardContainer>
          </RightContent>
        </ContentWrapper>
      </Center>
    </Section>
  );
}