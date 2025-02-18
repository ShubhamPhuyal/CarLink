import styled from "styled-components";
import Center from "./Center";
import { BiTimer, BiSupport, BiPackage, BiLockAlt } from "react-icons/bi";

const FeatureSection = styled.div`
  padding: 20px 0;  // Reduce padding to balance spacing
  background-color: #f0f8ff; 
  margin-top: 30px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 750;
  margin: 10px 0; // Reduce margin to avoid extra spacing
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin: 0 0 4px 0;
  font-size: 1.2rem;
`;

const Subtitle2 = styled.p`
  text-align: center;
  color: #666;
  margin: 0 0 32px 0;
  font-size: 1.2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 20px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
`;

const IconWrapper = styled.div`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  
  ${({ variant }) => {
    switch (variant) {
      case 'delivery':
        return 'background: #E8F5E9;'; // Light green
      case 'support':
        return 'background: #F3E5F5;'; // Light purple
      case 'package':
        return 'background: #E3F2FD;'; // Light blue
      case 'confidentiality':
        return 'background: #FFF3E0;'; // Light orange
      default:
        return 'background: #f8f8f8;';
    }
  }}
  
  svg {
    font-size: 24px;
    color: #333;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

export default function BrandTicker() {
  const features = [
    {
      icon: <BiTimer />,
      title: "24-hour car delivery",
      variant: "delivery"
    },
    {
      icon: <BiSupport />,
      title: "24/7 technical support",
      variant: "support"
    },
    {
      icon: <BiPackage />,
      title: "All models have a premium package",
      variant: "package"
    },
    {
      icon: <BiLockAlt />,
      title: "Absolute confidentiality",
      variant: "confidentiality"
    }
  ];

  return (
    <Center>
      <FeatureSection>
        <Title>Key Features</Title>
        <Subtitle>We are all about our client's comfort and safety.</Subtitle>
        <Subtitle2>That's why we provide the best service you can imagine.</Subtitle2>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <IconWrapper variant={feature.variant}>
                {feature.icon}
              </IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeatureSection>
    </Center>
  );
}