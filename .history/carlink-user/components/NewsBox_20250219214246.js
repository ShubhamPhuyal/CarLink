import Link from "next/link";
import styled from "styled-components";

// --- Styled Components ---
// (keeping all your existing styled components)

// Update the ReadButton component
const ReadButton = styled(Link)`
  display: flex;
  align-items: center;
  color: #222;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0066cc;
  }

  &::after {
    content: "↗";
    display: inline-block;
    margin-left: 4px;
    font-size: 1rem;
    transition: transform 0.2s ease;
  }
  
  &:hover::after {
    transform: translateX(2px) translateY(-2px);
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
          <ReadButton href={url}>Read post</ReadButton>
        </Footer>
      </CardContent>
    </Card>
  );
}