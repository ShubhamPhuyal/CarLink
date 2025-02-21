import Center from "@/components/Center"; 
import Header from "@/components/Header"; 
import { mongooseConnect } from "@/lib/mongoose"; 
import { Product } from "@/models/Product"; 
import { Category as CategoryModel } from "@/models/Category"; // Rename imported Category model
import styled from "styled-components"; 
import { FaCalendarAlt } from "react-icons/fa"; // Importing a calendar icon
import NewsList from "@/components/NewsList"; // Import the NewsList component

const BlogContainer = styled.div`
  max-width: 1000px;
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
  text-align: justify; /* Align text to both left and right */
  padding: 0 1x; /* Optional: Add padding for better spacing */
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
  font-size: 1rem;
  color: #666;
`;

const CategoryStyled = styled.span`  /* Renamed styled component */
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
  display: flex;
  align-items: center;
  background-color: #f0f7ff; /* Same background as Category */
  color: #0066cc; /* Same text color as Category */
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;

  svg {
    margin-right: 4px; /* Space between icon and text */
  }
`;

export default function ProductPage({ product, newsProducts }) {
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
            {product.properties && product.properties[0]?.Type && (
              <CategoryStyled>{product.properties[0].Type}</CategoryStyled> // Updated to CategoryStyled
            )}
            {product.properties && product.properties[0]?.Brand && (
              <CategoryStyled>{product.properties[0].Brand}</CategoryStyled> // Updated to CategoryStyled
            )} 
          </PropertiesBox>
          {product.images?.length > 0 && (
            <ProductImage src={`http://localhost:3000${product.images[0]}`} alt="Product Image" />
          )}
          <Description>{product.description}</Description>

          {/* Display News Products */}
          <BlogTitle>Latest News</BlogTitle>
          <NewsList products={newsProducts} />
        </BlogContainer>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);

  // Fetch news products
  const newsCategory = await CategoryModel.findOne({ name: 'News' }); // Use renamed model
  const newsProducts = newsCategory 
    ? await Product.find({ category: newsCategory._id }).sort({ createdAt: -1 }).limit(5) // Adjust limit as needed
    : [];

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      newsProducts: JSON.parse(JSON.stringify(newsProducts)),
    },
  };
}
