import React from 'react';
import mongooseConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";

const BlogContainer = styled.div`
  max-width: 900px;
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

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

const MetaItem = styled.span`
  background-color: #f0f7ff;
  color: #0066cc;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 12px;
  border-radius: 6px;
`;

const Description = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  white-space: pre-wrap; /* Preserves line breaks and spaces */
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export default function ProductPage({ product }) {
  const publishedDate = new Date(product.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Header />
      <Center>
        <BlogContainer>
          {product.images?.length > 0 && (
            <ProductImage src={`http://localhost:3000${product.images[0]}`} alt="Product Image" />
          )}
          <BlogTitle>{product.title}</BlogTitle>
          
          {/* Meta Info: Date, Type, and Brand */}
          <MetaInfo>
            <span>Published: {publishedDate}</span>
            {product.type && <MetaItem>{product.Type}</MetaItem>}
            {product.brand && <MetaItem>{product.Brand}</MetaItem>}
          </MetaInfo>

          <Description>{product.description}</Description>
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
