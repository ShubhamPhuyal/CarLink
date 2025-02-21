import React from 'react';
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import styled from "styled-components";
import ProductImages from "@/components/ProductImages";

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 8px;
  line-height: 1.2;
`;

const Description = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
`;

export default function ProductPage({ product }) {
  return (
    <>
      <Header />
      <Center>
        <BlogContainer>
          <BlogTitle>{product.title}</BlogTitle>
          <Description>{product.description}</Description>
          <ProductImages images={product.images.map(image => `http://localhost:3000${image}`)} />
        </BlogContainer>
      </Center>
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