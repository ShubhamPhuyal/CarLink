import Link from "next/link";
import styled from "styled-components";

// --- Styled Components ---

const Card = styled.article`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  overflow: hidden;
  width: 400px;
  margin: 16px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled(Link)`
  display: block;
  width: 100%;
  height: 180px;
  overflow: hidden;
  position: relative;
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

const CardContent = styled.div`
  padding: 20px;
`;

const PropertiesBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 0.8rem;
  color: #666;
`;

const Category = styled.span`
  display: inline-block;
  background-color: #f0f7ff;
  color: #0066cc;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  border-radius: 24px;
`;

const Title = styled(Link)`
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.4;
  color: #1a1a1a;
  margin-bottom: 12px;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0066cc;
  }
`;

const DescriptionWrapper = styled.div`
  color: #555;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  height: 60px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
`;

const DatePublished = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: #222;
`;

const ReadButton = styled.button`
  background-color: #0066cc;
  color: white;
  font-weight: 500;
  font-size: 0.8rem;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0052a3;
  }
`;

// --- Component ---

export default function NewsBox({ _id, title, description, images, properties, createdAt }) {
  const url = "/product/" + _id;

  // Format the date to show abbreviated month (e.g., "Feb 2025")
  const publishedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  // Safely access properties
  const propertyData = properties && properties[0] ? properties[0] : {};

  return (
    <Card>
      <ImageContainer href={url}>
        {images && images[0] ? (
          <StyledImage
            src={`http://localhost:3000${images[0]}`}
            alt={title || "Blog post image"}
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
          <ReadButton>Read More</ReadButton>
        </Footer>
      </CardContent>
    </Card>
  );
}
