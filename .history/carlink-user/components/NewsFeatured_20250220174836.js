import styled from "styled-components";
import Center from "./Center";
import Button from "@/components/Button";

const Section = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ContentArea = styled.div`
  max-width: 560px;
  
  @media (max-width: 1024px) {
    max-width: 100%;
    order: 2;
  }
`;

const BlogHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(to right, #2563eb, #1e40af);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subheading = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: #4B5563;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(Button)`
  padding: 0.875rem 2rem;
  font-weight: 600;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.3);
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  padding: 0.875rem 2rem;
  background: transparent;
  color: #2563eb;
  font-weight: 600;
  border: 2px solid #2563eb;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(37, 99, 235, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: perspective(1000px) rotateY(0deg);
  }
  
  @media (max-width: 1024px) {
    max-width: 90%;
    margin: 0 auto;
    order: 1;
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ShapeDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 70px;
    transform: rotateY(180deg);
  }
  
  .shape-fill {
    fill: rgba(255, 255, 255, 0.8);
  }
`;

export default function BlogHero() {
  return (
    <Section>
      <Center>
        <Wrapper>
          <ContentArea>
            <Subheading>Car Enthusiast Blog</Subheading>
            <BlogHeading>
              Automotive Freedom Starts Here
            </BlogHeading>
            <Description>
              Discover the latest in automotive innovation, rental tips, and driving experiences. Your journey to the perfect ride begins with just a few clicks.
            </Description>
            <CTAGroup>
              <PrimaryButton>Explore Cars</PrimaryButton>
              <SecondaryButton href="/blog">Read Articles</SecondaryButton>
            </CTAGroup>
          </ContentArea>
          
          <ImageContainer>
            <BlogImage src="header car.png" alt="Sleek Sports Car" />
          </ImageContainer>
        </Wrapper>
      </Center>
      
      <ShapeDivider>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </ShapeDivider>
    </Section>
  );
}