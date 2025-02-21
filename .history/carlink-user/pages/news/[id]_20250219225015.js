import Center from "@/components/Center"; 
import Header from "@/components/Header"; 
import Title from "@/components/Title"; 
import { mongooseConnect } from "@/lib/mongoose"; 
import { Product } from "@/models/Product"; 
import styled from "styled-components"; 
import ProductImages from "@/components/ProductImages"; 

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

const PropertiesBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #666;
`;

const Category = styled.span`
  display: inline-block;
  background-color: #f0f7ff;
  color: #0066cc;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 4px;
`;

const DatePublished = styled.span`
  font-weight: 600;
  color: #222;
`;

export default function ProductPage({ product }) {
  const publishedDate = new Date(product.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
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
          <PropertiesBox>
            {product.properties && product.properties[0]?.Type && (
              <Category>{product.properties[0].Type}</Category>
            )}
            {product.properties && product.properties[0]?.Brand && (
              <Category>{product.properties[0].Brand}</Category>
            )}
            <DatePublished>Published: {publishedDate}</DatePublished>
          </PropertiesBox>
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
