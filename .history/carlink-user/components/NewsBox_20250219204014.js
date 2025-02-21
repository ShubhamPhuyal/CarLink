import Link from "next/link";
import styled from "styled-components";
import { Calendar, Clock, Eye } from "react-feather"; // Import icons (add this dependency if needed)

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
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
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
  margin-bottom: 12px;
  transition: color 0.2s ease;
`;

const Excerpt = styled.p`
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.85rem;
  
  svg {
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #0052a3;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export default function NewsBox({ _id, title, description, price, images, properties, category = "News" }) {
  const url = "/blog/" + _id;
  
  // Format description to ensure it's not too long
  const excerpt = description?.length > 120 ? 
    `${description.substring(0, 120)}...` : 
    description;
  
  // Calculate estimated read time (1 min per 200 characters)
  const readTime = Math.max(1, Math.ceil((description?.length || 0) / 200));
  
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
        <Category>{category}</Category>
        
        <TitleLink href={url}>
          <Title>{title}</Title>
        </TitleLink>
        
        <Excerpt>{excerpt}</Excerpt>
        
        <Meta>
          <div style={{ display: 'flex', gap: '16px' }}>
            <MetaItem>
              <Clock size={14} />
              {readTime} min read
            </MetaItem>
            <MetaItem>
              <Eye size={14} />
              {Math.floor(Math.random() * 900) + 100} views
            </MetaItem>
          </div>
          
          <ReadButton>Read Article</ReadButton>
        </Meta>
      </CardContent>
    </Card>
  );
}