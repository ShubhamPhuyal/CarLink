import Link from "next/link";
import styled from "styled-components";
import { ArrowUpRight } from "lucide-react";

// ... (previous styled components remain the same until DatePublished)

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

const ReadButton = styled.button`
  background: none;
  border: none;
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
          <ReadButton>
            Read post
            <ArrowUpRight size={16} />
          </ReadButton>
        </Footer>
      </CardContent>
    </Card>
  );
}