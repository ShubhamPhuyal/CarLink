import styled from "styled-components";
import Center from "./Center"; // Importing the reusable Center component
import PrimaryBtn, { ButtonStyle } from "./Button";
import { Product } from "@/models/Product";
import ButtonLink from "./ButtonLink";

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

const SearchSection = styled.div`
  margin-bottom: 2rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) { /* Mobile */
    flex-direction: column;
    align-items: center;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) { /* Mobile */
    flex-direction: column;
    width: 100%;
  }
`;

const Select = styled.select`
  width: 16rem;
  padding: 0.75rem;
  border: 1px solid #D1D5DB;

  @media (max-width: 768px) { /* Mobile */
    width: 100%;
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

export default function Featured({product}) {
  return (
    <Section>
      <Center> {/* Reusing the Center component */}
        <Wrapper>
          {/* Left Content */}
          <LeftContent>
            <Title>
              
              Find, book and<br />
              rent a car <Highlight>Easily</Highlight>
            </Title>
            <Description>
              Get a car wherever and whenever you need it with your IOS and Android device.
            </Description>

            {/* Search Section */}
            <ButtonLink href={'/products/'+product._id}>Explore Cars</ButtonLink> {/* Blue button */}
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
