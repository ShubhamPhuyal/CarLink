import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";  // Assuming News model is set up in your models folder
import styled from "styled-components";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";

const iconColor = "#3361E0";

const NewsWrapper = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const LeftColumn = styled.div`
  flex-basis: 65%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NewsTitle = styled(Title)`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const NewsImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const NewsContent = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  color: #333;
  margin-top: 20px;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 0.9rem;
`;

const AuthorIcon = styled(FaUserAlt)`
  color: ${iconColor};
`;

const DateIcon = styled(FaCalendarAlt)`
  color: ${iconColor};
`;

export default function NewsPage({ news }) {
  const { title, description, image, author, createdAt, content } = news;

  const publishedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Header />
      <Center>
        <NewsWrapper>
          <LeftColumn>
            <NewsTitle>{title}</NewsTitle>
            <NewsImage src={`http://localhost:3000${image}`} alt={title} />
            <DateWrapper>
              <DateIcon /> <span>{publishedDate}</span> | <AuthorIcon /> <span>{author}</span>
            </DateWrapper>
            <NewsContent>{content || description}</NewsContent>
          </LeftColumn>
        </NewsWrapper>
      </Center>
    </>
  );
}

// Fetching the news data for the detailed page
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const news = await News.findById(id);
  return {
    props: {
      news: JSON.parse(JSON.stringify(news)),
    },
  };
}
