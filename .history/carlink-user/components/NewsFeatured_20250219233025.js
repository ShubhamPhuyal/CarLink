
import Link from 'next/link';
import styled from 'styled-components';
import { ArrowUpRight } from 'lucide-react';

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto 2rem auto;
`;

const Article = styled.article`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageLink = styled(Link)`
  position: relative;
  display: block;
  height: 400px;
  overflow: hidden;

  @media (min-width: 1024px) {
    height: 100%;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ContentSection = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 1024px) {
    padding: 3rem;
  }
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const Category = styled.span`
  background-color: #f0f7ff;
  color: #0066cc;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.5rem 1rem;
  border-radius: 8px;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  transition: color 0.2s ease;

  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }

  &:hover {
    color: #0066cc;
  }
`;

const Description = styled.div`
  font-size: 1.125rem;
  color: #4a5568;
  margin-bottom: 2rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  line-height: 1.6;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f0f0;
`;

const DatePublished = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
`;

const ReadLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0066cc;
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
    <Container>
      <Article>
        <Grid>
          <ImageLink href={url}>
            {images && images[0] ? (
              <StyledImage
                src={`http://localhost:3000${images[0]}`}
                alt={title || "Featured news image"}
              />
            ) : (
              <StyledImage />
            )}
          </ImageLink>

          <ContentSection>
            <div>
              <CategoriesWrapper>
                {propertyData.Type && (
                  <Category>{propertyData.Type}</Category>
                )}
                {propertyData.Brand && (
                  <Category>{propertyData.Brand}</Category>
                )}
              </CategoriesWrapper>

              <TitleLink href={url}>
                <Title>{title}</Title>
              </TitleLink>

              <Description>{description}</Description>
            </div>

            <Footer>
              <DatePublished>Published: {publishedDate}</DatePublished>
              <ReadLink href={url}>
                Read full article
                <ArrowUpRight size={20} />
              </ReadLink>
            </Footer>
          </ContentSection>
        </Grid>
      </Article>
    </Container>
  );
}