import Link from "next/link";
import styled from "styled-components";
import { ArrowUpRight } from "lucide-react";

const Card = styled.article`
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 1400px;
  margin: 32px auto;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
  }
`;

const HeroLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 1fr;
  }
`;

const ImageContainer = styled(Link)`
  display: block;
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;

  @media (min-width: 1024px) {
    height: 600px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1024px) {
    padding: 48px;
  }
`;

const PropertiesBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const Category = styled.span`
  display: inline-block;
  background-color: #f0f7ff;
  color: #0066cc;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0066cc;
    color: #fff;
  }
`;

const Title = styled(Link)`
  display: block;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
  color: #1a1a1a;
  margin-bottom: 16px;
  text-decoration: none;
  transition: color 0.3s ease;

  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }

  &:hover {
    color: #0066cc;
  }
`;

const DescriptionWrapper = styled.div`
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 32px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
  margin-top: auto;
`;

const DatePublished = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #222;
`;

const ReadButton = styled.button`
  background: none;
  border: 2px solid #0066cc;
  color: #0066cc;
  font-weight: 600;
  font-size: 1rem;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0066cc;
    color: #fff;
    transform: translateY(-2px);
  }
`;

export default function NewsFeatured({ _id, title, description, images, properties, createdAt }) {
  const url = "/news/" + _id;

  const publishedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  const propertyData = properties && properties[0] ? properties[0] : {};

  return (
    <Card>
      <HeroLayout>
        <ImageContainer href={url}>
          {images && images[0] ? (
            <StyledImage
              src={`http://localhost:3000${images[0]}`}
              alt={title || "Featured news image"}
            />
          ) : (
            <StyledImage />
          )}
        </ImageContainer>

        <CardContent>
          <PropertiesBox>
            {propertyData.Type && <Category>{propertyData.Type}</Category>}
            {propertyData.Brand && <Category>{propertyData.Brand}</Category>}
          </PropertiesBox>

          <Title href={url}>{title}</Title>

          <DescriptionWrapper>{description}</DescriptionWrapper>

          <Footer>
            <DatePublished>Published: {publishedDate}</DatePublished>
            <ReadButton>
              Read full article
              <ArrowUpRight size={20} />
            </ReadButton>
          </Footer>
        </CardContent>
      </HeroLayout>
    </Card>
  );
}