import styled from "styled-components";
import Center from "./Center";
import Button from "@/components/Button";

const Section = styled.div`
  position: relative;
  overflow: hidden;
  padding: 3rem 0;
  background: linear-gradient(120deg, #f0f4ff 0%, #e6eeff 100%);
  min-height: 400px;
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
    radial-gradient(circle at 80% 40%, rgba(99, 102, 241, 0.15) 0%, transparent 40%);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
`;

const LeftContent = styled.div`
  max-width: 550px;
  
  @media (max-width: 1024px) {
    max-width: 100%;
  }
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
  font-size: 2.5rem;
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
  margin-bottom: 1.5rem;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(to right, #4f46e5, #6366f1);
  border: none;
  padding: 0.75rem 1.5rem;
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
  padding: 0.75rem 1.5rem;
  color: #4f46e5;
  font-weight: 600;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RightContent = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 380px;
  height: 240px;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 340px;
    height: 220px;
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
  transition: transform 0.4s ease;
  
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
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(79, 70, 229, 0.4) 100%);
  z-index: -1;
  border-radius: 12px;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  color: white;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardStats = styled.div`
  display: flex;
  gap: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatValue = styled.div`
  font-weight: 700;
  font-size: 1.125rem;
  color: white;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export default function CarMarketplaceNews() {
  return (
    <Section>
      <MeshBackground />
      
      <Center>
        <ContentWrapper>
          <LeftContent>
            <NewsTag>MARKET UPDATE</NewsTag>
            <Heading>Latest trends in the automotive marketplace</Heading>
            <Subtitle>
              Stay informed with weekly market analysis, price fluctuations, and inventory updates from top dealers nationwide.
            </Subtitle>
            
            <ButtonWrapper>
              <PrimaryButton>Browse Market Report</PrimaryButton>
              <SecondaryButton href="/news">View All News</SecondaryButton>
            </ButtonWrapper>
          </LeftContent>
          
          <RightContent>
            <CardContainer>
              <GlassCard>
                <CardContent>
                  <CardHeader>
                    <CardTitle>Market Highlights</CardTitle>
                  </CardHeader>
                  
                  <CardFooter>
                    <CardStats>
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
                    </CardStats>
                  </CardFooter>
                </CardContent>
                <CardGradient />
              </GlassCard>
            </CardContainer>
          </RightContent>
        </ContentWrapper>
      </Center>
    </Section>
  );
}