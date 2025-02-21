import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Center from "./Center";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Section = styled.div`
  position: relative;
  overflow: hidden;
  padding: 3.5rem 0;
  margin-top: 2rem;
  border-radius: 14px;
  background: linear-gradient(120deg, #f0f4ff 0%, #e6eeff 100%);
  min-height: 420px;
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
  animation: ${gradientAnimation} 15s ease infinite;
  background-size: 200% 200%;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
`;

const TopicsHeader = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 12px;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 20px;
`;

const FilterButton = styled.button`
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  background-color: ${(props) => (props.selected ? "#3b82f6" : "#f1f5f9")};
  color: ${(props) => (props.selected ? "white" : "#64748b")};
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? "#2563eb" : "#e2e8f0")};
    transform: translateY(-1px);
  }
`;

export default function HeroSection({ products, setFilteredProducts }) {
  const [selectedType, setSelectedType] = useState("");

  const types = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Type)).filter(Boolean))];

  const handleTypeClick = (type) => {
    setSelectedType(type === selectedType ? "" : type);
    let filtered = products.filter(product =>
      product.properties.some(prop => prop.Type === type)
    );
    setFilteredProducts(filtered);
  };

  return (
    <Section>
      <MeshBackground />
      <Center>
        <ContentWrapper>
          <TopicsHeader>Find Your Perfect Car</TopicsHeader>
          <FilterContainer>
            {types.map(type => (
              <FilterButton 
                key={type} 
                selected={type === selectedType}
                onClick={() => handleTypeClick(type)}
              >
                {type}
              </FilterButton>
            ))}
          </FilterContainer>
        </ContentWrapper>
      </Center>
    </Section>
  );
}