import Link from "next/link";
import styled from "styled-components";

const Card = styled.article`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 320px;
  margin: 16px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
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

const Category = styled.span`
  display: inline-block;
  background-color: #f0f7ff;
  color: #0066cc;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 3px 8px;
  border-radius: 50px;
  margin-bottom: 10px;
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
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.4;
  color: #1a1a1a;
  margin-bottom: 12px;
  transition: color 0.2s ease;
`;

const DescriptionWrapper = styled.div`
  color: #555;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 16px;
  
  /* Using your original description styling */
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

const Price = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: #222;
`;

const ReadButton = styled.button`
  background-color: #0066cc;
  color: white;
  font-weight: 600;
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