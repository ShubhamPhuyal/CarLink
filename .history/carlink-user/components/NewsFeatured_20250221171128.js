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

const SearchInput = styled.input`
  width: 220px;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

export default function CarMarketplaceNews({ news, setFilteredNews }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      const searchFiltered = news.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNews(searchFiltered);
    }
  };

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
          
          <SearchInput
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyPress}
          />
        </ContentWrapper>
      </Center>
    </Section>
  );
}
