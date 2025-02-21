import React from 'react';
import Center from "@/components/Center";
import Header from "@/components/Header";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ArticleHeader = styled.div`
  text-align: center;
  margin: 60px 0 40px;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #1a1a1a;
  margin-bottom: 40px;
  line-height: 1.3;
  font-weight: 800;
  font-family: 'Georgia', serif;
`;

const FeaturedImage = styled.div`
  margin: 0 0 40px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Content = styled.article`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #2c2c2c;
  
  p {
    margin-bottom: 24px;
    font-family: 'system-ui', -apple-system, sans-serif;
  }
`;

export default function ProductPage({ product }) {
  const mainImage = product.images[0] ? `http://localhost:3000${product.images[0]}` : null;

  return (
    <>
      <Header />
      <Container>
        <ArticleHeader>
          <Title>{product.title}</Title>
        </ArticleHeader>

        {mainImage && (
          <FeaturedImage>
            <img src={mainImage} alt={product.title} />
          </FeaturedImage>
        )}

        <Content>
          <p>{product.description}</p>
        </Content>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}