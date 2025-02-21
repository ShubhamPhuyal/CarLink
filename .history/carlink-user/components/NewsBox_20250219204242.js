import Link from "next/link";
import styled from "styled-components";

const Card = styled.article`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 380px;
  margin: 16px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 24px;
`;

const Category = styled.span`
  display: inline-block;
  background-color: #f0f7ff;
  color: #0066cc;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 50px;
  margin-bottom: 12px;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  
  &:hover h2 {
    color: #0066cc;
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  color: #1a1a1a;
  margin-bottom: 16px;
  transition: color 0.2s ease;
`;

const DescriptionWrapper = styled.div`
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  
  /* Using your original description styling */
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
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: #222;
`;

const ReadButton = styled.button`
  background-color: #0066cc;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #0052a3;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export default function NewsBox({ _id, title, description, price, images, properties }) {
  const url = "/product/" + _id;
  
  return (
    <Card>
      <ImageContainer href={url}>
        {images && images[0] ? (
          <StyledImage 
            src={`http://localhost:3000${images[0]}`} 
            alt={title || "Blog post image"} 
          />
        ) : (
          <StyledImage 
            src="/images/placeholder-blog.jpg" 
            alt="Default blog image" 
          />
        )}
      </ImageContainer>
      
      <CardContent>
        <Category>Blog</Category>
        
        <TitleLink href={url}>
          <Title>{title}</Title>
        </TitleLink>
        
        <DescriptionWrapper>
          {description}
        </DescriptionWrapper>
        
        <Footer>
          <Price>Price: {price}</Price>
          <ReadButton>Read</ReadButton>
        </Footer>
      </CardContent>
    </Card>
  );
}