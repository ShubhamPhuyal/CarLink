import styled from "styled-components";
import Center from "./Center";
import ButtonLink from "./ButtonLink";

const Section = styled.div`
  background: linear-gradient(to right, white, #DBEAFE);
  padding: 3rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
`;

const LeftContent = styled.div`
  width: 600px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 3.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Highlight = styled.span`
  color: #2563eb;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: #4B5563;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const RightImage = styled.div`
  width: 700px;

  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  max-width: 100%;
  border-radius: 10px;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

export default function NewsFeatured({ products }) {
  if (!products || products.length === 0) {
    return null; // Don't render if no products exist
  }

  // Find the first blog post with "Type: News"
  const newsBlog = products.find((product) => 
    product.properties && product.properties.Type === "News"
  );

  if (!newsBlog) {
    return null; // If no News blog found, don't render
  }

  const { _id, title, description, images } = newsBlog;
  const blogUrl = `/news/${_id}`;

  return (
    <Section>
      <Center>
        <Wrapper>
          {/* Left Content */}
          <LeftContent>
            <Title>
              {title || "Featured News"} <Highlight>Highlight</Highlight>
            </Title>
            <Description>
              {description || "Read our latest featured news article."}
            </Description>

            {/* Read More Button */}
            <ButtonLink href={blogUrl}>Read More</ButtonLink>
          </LeftContent>

          {/* Right Image */}
          <RightImage>
            <Image 
              src={images && images[0] ? `http://localhost:3000${images[0]}` : "/default-blog.jpg"} 
              alt={title || "Featured news image"} 
            />
          </RightImage>
        </Wrapper>
      </Center>
    </Section>
  );
}
