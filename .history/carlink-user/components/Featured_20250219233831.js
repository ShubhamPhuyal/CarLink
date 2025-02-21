import { useRef } from "react";
import styled from "styled-components";
import Center from "./Center"; // Importing the reusable Center component
import Button from "@/components/Button";

const Section = styled.div`
  background: linear-gradient(to right, white, #DBEAFE); /* Tailwind's to-blue-100 */
  padding: 3rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) { /* Tablet */
    flex-direction: column;
    text-align: center;
  }
`;

const LeftContent = styled.div`
  width: 600px;
  margin-bottom: 30px;

  @media (max-width: 1024px) { /* Tablet */
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 3.75rem; /* text-6xl */
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) { /* Mobile */
    font-size: 2.5rem;
  }
`;

const Highlight = styled.span`
  color: #2563eb; /* Tailwind's blue-600 */
`;

const Description = styled.p`
  font-size: 1.25rem; /* text-xl */
  color: #4B5563; /* Tailwind's text-gray-600 */
  margin-bottom: 2rem;

  @media (max-width: 768px) { /* Mobile */
    font-size: 1rem;
  }
`;

const RightImage = styled.div`
  width: 700px;

  @media (max-width: 1024px) { /* Tablet */
    width: 100%;
    text-align: center;
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  max-width: 100%;

  @media (max-width: 768px) { /* Mobile */
    max-width: 90%;
  }
`;

export default function Featured() {
  const scrollDuration = 2000; // Duration for scrolling (in milliseconds)
  
  const handleScroll = () => {
    const targetPosition = window.innerHeight; // Scroll down by one full viewport height

    let start = null;
    const animateScroll = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      const scrollY = Math.min(progress / scrollDuration * targetPosition, targetPosition);
      window.scrollTo(0, scrollY);

      if (scrollY < targetPosition) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <Section>
      <Center>
        <Wrapper>
          {/* Left Content */}
          <LeftContent>
            <Title>
              Find, book and<br />
              rent a car <Highlight>Easily</Highlight>
            </Title>
            <Description>
              Get a car wherever and whenever you need it with your iOS and Android device.
            </Description>

            {/* Button triggers scroll down */}
            <Button onClick={handleScroll}>Explore Cars</Button>
          </LeftContent>

          {/* Right Image */}
          <RightImage>
            <Image src="header car.png" alt="Blue Sports Car" />
          </RightImage>
        </Wrapper>
      </Center>
    </Section>
  );
}
