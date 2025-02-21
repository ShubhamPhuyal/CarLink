import Link from "next/link";
import styled from "styled-components";
import { ArrowUpRight } from "lucide-react";

const Card = styled.article`
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: 4580px;
  margin-top: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled(Link)`
  display: block;
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);

  &:hover {
    transform: scale(1.07);
  }
`;

const CardContent = styled.div`
  padding: 24px;
`;

const PropertiesBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 0.8rem;
  color: #666;
`;

const Category = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #e0edff 0%, #f0f7ff 100%);
  color: #0066cc;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 6px 12px;
  border-radius: 8px;
  margin-bottom: 2px;
  box-shadow: 0 2px 5px rgba(0, 102, 204, 0.1);
`;

const Title = styled(Link)`
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  color: #0f172a;
  margin-bottom: 12px;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0066cc;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }
`;

const DescriptionWrapper = styled.div`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  height: 70px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const DatePublished = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: #64748b;
  display: flex;
  align-items: center;
  
  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #0066cc;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const ReadButton = styled.button`
  background: none;
  border: none;
  color: #0f172a;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #0066cc;
    transition: width 0.2s ease;
  }

  &:hover {
    color: #0066cc;
    
    &::after {
      width: 100%;
    }
    
    svg {
      transform: translate(3px, -3px);
    }
  }
  
  svg {
    transition: transform 0.2s ease;
  }
`;

export default function NewsBox({ _id, title, description, images, properties, createdAt }) {
  const url = "/news/" + _id;

  const publishedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

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
          <ReadButton>
            Read post
            <ArrowUpRight size={18} />
          </ReadButton>
        </Footer>
      </CardContent>
    </Card>
  );
}