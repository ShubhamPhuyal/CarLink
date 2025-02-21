import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Title = styled.div`
  padding-top: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Heading = styled.h1`
  font-size: 1.8rem;
  padding-left: 10px;
  margin: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
`;

const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #0066cd;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.2s ease;

  &:hover {
    color: #004999;
    transform: translateX(5px);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;

  .slick-slide {
    display: flex;
    justify-content: center;
  }

  .slick-dots {
    bottom: -35px;
  }

  .slick-dots li button:before {
    font-size: 10px;
    color: #ccc;
  }

  .slick-dots li.slick-active button:before {
    color: #0066cc;
  }
`;

const NewsCard = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  text-align: center;

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 6px;
  }

  h3 {
    font-size: 1.2rem;
    margin: 10px 0;
  }

  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

export default function NewsBox({ news }) {
  const newsCount = news?.length || 0;

  const settings = {
    dots: true,
    infinite: newsCount > 1,
    speed: 500,
    slidesToShow: Math.min(newsCount, 3),
    slidesToScroll: 1,
    autoplay: newsCount > 1,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(newsCount, 2) } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Center>
      <Title>
        <Heading>Latest Car News</Heading>
        <StyledLink href="/news" passHref>
          <ViewAllButton>
            View all News
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
              <path d="M10 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ViewAllButton>
        </StyledLink>
      </Title>

      <SliderWrapper>
        {newsCount > 0 ? (
          <Slider {...settings}>
            {news.map((article) => (
              <NewsCard key={article._id}>
                <img src={article.image} alt={article.title} />
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
              </NewsCard>
            ))}
          </Slider>
        ) : (
          <p style={{ textAlign: "center", color: "gray" }}>No news available</p>
        )}
      </SliderWrapper>
    </Center>
  );
}
