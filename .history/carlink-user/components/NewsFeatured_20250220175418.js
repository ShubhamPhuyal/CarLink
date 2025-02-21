import styled from "styled-components";
import Center from "./Center";
import Button from "@/components/Button";

const Section = styled.div`
  position: relative;
  overflow: hidden;
  padding: 3.5rem 0;
  background: linear-gradient(120deg, #f0f4ff 0%, #e6eeff 100%);
  min-height: 320px;
`;

const MeshBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  background: 
    radial-gradient(circle at 15% 20%, rgba(105, 145, 255, 0.2) 0%, transparent 35%),
    radial-gradient(circle at 85% 60%, rgba(99, 102, 241, 0.15) 0%, transparent 45%);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  padding: 0 1rem;
`;

const Heading = styled.h1`
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #1e293b;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Highlight = styled.span`
  color: #4f46e5;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.5;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeatureRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.95rem;
  
  &:before {
    content: "•";
    color: #4f46e5;
    font-weight: bold;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(to right, #4f46e5, #6366f1);
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 8px -1px rgba(79, 70, 229, 0.2);
  }
`;

export default function CarRentalHero() {
  return (
    <Section>
      <MeshBackground />
      
      <Center>
        <ContentWrapper>
          <Heading>
            Find, book and rent a car <Highlight>Easily</Highlight>
          </Heading>
          <Subtitle>
            Get a car wherever and whenever you need it with your iOS and Android device.
          </Subtitle>
          
          <FeatureRow>
            <FeatureItem>No hidden fees</FeatureItem>
            <FeatureItem>Instant booking</FeatureItem>
            <FeatureItem>24/7 support</FeatureItem>
          </FeatureRow>
          
          <PrimaryButton>Explore Cars</PrimaryButton>
        </ContentWrapper>
      </Center>
    </Section>
  );
}