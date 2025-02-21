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

export default function NewsFeatured({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return null; // If no blogs exist, don't render anything
  }

  const latestBlog = blogs[0]; // Get the first blog post
  const { _id, title, description, images } = latestBlog;
  const blogUrl = `/news/${_id}`;

  return (
    <Section>
      <Center>
        <Wrapper>
          {/* Left Content */}
          <LeftContent>
            <Title>
              {title ? title : "Featured Blog"} <Highlight>Highlight</Highlight>
            </Title>
            <Description>
              {description ? description : "Read our latest featured article."}
            </Description>

            {/* Read More Button */}
            <ButtonLink href={blogUrl}>Read More</ButtonLink>
          </LeftContent>

          {/* Right Image */}
          <RightImage>
            <Image 
              src={images && images[0] ? `http://localhost:3000${images[0]}` : "/default-blog.jpg"} 
              alt={title || "Featured blog image"} 
            />
          </RightImage>
        </Wrapper>
      </Center>
    </Section>
  );
}
