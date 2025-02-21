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
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
`;

const NewsTag = styled.span`
  display: inline-block;
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
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

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 1.75rem;
  line-height: 1.5;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(to right, #4f46e5, #6366f1);
  border: none;
  padding: 0.75rem 1.75rem;
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

const SecondaryButton = styled.a`
  display: inline-block;
  padding: 0.75rem 1.75rem;
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StatRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(99, 102, 241, 0.2);
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  color: #4f46e5;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
`;

export default function CarMarketplaceNews() {
  return (
    <Section>
      <MeshBackground />
      
      <Center>
        <ContentWrapper>
          <NewsTag>MARKET UPDATE</NewsTag>
          <Heading>Latest trends in the automotive marketplace</Heading>
          <Subtitle>
            Stay informed with weekly market analysis, price fluctuations, and inventory updates from top dealers nationwide.
          </Subtitle>
          
          <ButtonWrapper>
            <PrimaryButton>Browse Market Report</PrimaryButton>
            <SecondaryButton href="/news">View All News</SecondaryButton>
          </ButtonWrapper>
          
          <StatRow>
            <StatItem>
              <StatValue>+12%</StatValue>
              <StatLabel>SUV Sales</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>-3.2%</StatValue>
              <StatLabel>Sedan Prices</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>26K</StatValue>
              <StatLabel>New Listings</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>42 Days</StatValue>
              <StatLabel>Avg. Market Time</StatLabel>
            </StatItem>
          </StatRow>
        </ContentWrapper>
      </Center>
    </Section>
  );
}