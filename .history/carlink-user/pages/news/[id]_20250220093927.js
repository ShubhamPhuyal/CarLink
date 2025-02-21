import Center from "@/components/Center"; 
import Header from "@/components/Header"; 
import { mongooseConnect } from "@/lib/mongoose"; 
import { Product } from "@/models/Product"; 
import styled from "styled-components"; 
import { FaCalendarAlt } from "react-icons/fa"; // Importing a calendar icon
import Footer from "@/components/Footer";

const BlogContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BlogTitle = styled.h1`
  font-size: 2.7rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 12px;
  line-height: 1.3;
`;

const Description = styled.p`
  color: #444; 
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 40px;
  white-space: pre-wrap; /* Preserves line breaks and spaces */
  text-align: justify; 
  padding: 0 10px; /* Fixed padding issue */
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 30px; /* Increased margin for better spacing */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Added subtle shadow */
`;

const PropertiesBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  font-size: 1rem;
  color: #666;
`;

const Category = styled.span`
  display: inline-block;
  background-color: #f0f7ff;
  color: #0066cc;
  font-size: 0.95rem; /* Slightly increased font size */
  font-weight: 600;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 4px;
  box-shadow: 1px 1px 5px rgba(0, 102, 204, 0.2);
`;

const DatePublished = styled.span`
  display: flex;
  align-items: center;
  background-color: #f0f7ff;
  color: #0066cc;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.95rem;
  box-shadow: 1px 1px 5px rgba(0, 102, 204, 0.2);

  svg {
    margin-right: 6px;
  }
`;

const ReadMoreButton = styled.a`
  display: inline-block;
  background-color: #0066cc;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  padding: 12px 18px;
  border-radius: 6px;
  margin-top: 20px;
  transition: background 0.3s ease-in-out;
  text-decoration: none;

  &:hover {
    background-color: #004a99;
  }
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
          <BlogTitle>{product.title}</BlogTitle>
          <PropertiesBox>
            <DatePublished>
              <FaCalendarAlt size={14} /> Published: {publishedDate}
            </DatePublished>
            {product.properties?.[0]?.Type && <Category>{product.properties[0].Type}</Category>}
            {product.properties?.[0]?.Brand && <Category>{product.properties[0].Brand}</Category>} 
          </PropertiesBox>
          {product.images?.length > 0 && (
            <ProductImage src={`http://localhost:3000${product.images[0]}`} alt="Product Image" />
          )}
          <Description>{product.description}</Description>
          <ReadMoreButton href="/blog">Read More</ReadMoreButton>
        </BlogContainer>
      </Center>
      <Footer />
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
