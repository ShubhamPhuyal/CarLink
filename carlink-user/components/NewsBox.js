import Link from "next/link";
import styled from "styled-components";
import { ArrowUpRight } from "lucide-react";

const Card = styled.article`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  width: 400px;
  margin-top: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.03);

  &:hover {
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
  }
`;

const ImageContainer = styled(Link)`
  display: block;
  width: 100%;
  height: 190px;
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
  padding: 18px;
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
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 5px 10px;
  border-radius: 6px;
  margin-bottom: 2px;
`;

const Title = styled(Link)`
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  color: #1a1a1a;
  margin-bottom: 8px;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0066cc;
  }
`;

const DescriptionWrapper = styled.div`
  color: #555;
  font-size: 0.9rem;
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
  font-weight: 500;
  font-size: 0.85rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background-color: #0066cc;
    border-radius: 50%;
    display: inline-block;
  }
`;

const ReadButton = styled(Link)`
  background: none;
  
  border: none;
  text-decoration:none;
  color: #0f172a;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #0066cc;
    text-decoration:none;
  }
`;

export default function NewsBox({ _id, title, description, images, properties, createdAt }) {
  const url = "/news/" + _id;

  // Format the date to include day, month, and year
  const publishedDate = new Date(createdAt);
  const month = publishedDate.toLocaleString("en-US", { month: "short" });
  const day = publishedDate.getDate();
  const year = publishedDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

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
          <DatePublished>{formattedDate}</DatePublished>
          <ReadButton href={url}>
            Read post
            <ArrowUpRight size={16} />
          </ReadButton>
        </Footer>
      </CardContent>
    </Card>
  );
}