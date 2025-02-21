import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category as CategoryModel } from "@/models/Category"; // Rename the import to avoid conflict
import styled from "styled-components";
import { FaCalendarAlt } from "react-icons/fa"; // Importing a calendar icon
import NewsList from "@/components/NewsList"; // Import NewsList

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
  white-space: pre-wrap;
  text-align: justify;
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

const CategoryTag = styled.span` // Renamed to avoid conflict
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
  background-color: #f0f7ff;
  color: #0066cc;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;

  svg {
    margin-right: 4px;
  }
`;

export default function ProductPage({ product, newsProducts }) { // Add newsProducts as a prop
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
              <CategoryTag>{product.properties[0].Type}</CategoryTag>
            )}
            {product.properties && product.properties[0]?.Brand && (
              <CategoryTag>{product.properties[0].Brand}</CategoryTag>
            )}
          </PropertiesBox>
          {product.images?.length > 0 && (
            <ProductImage src={`http://localhost:3000${product.images[0]}`} alt="Product Image" />
          )}
          <Description>{product.description}</Description>
          <NewsList products={newsProducts} /> {/* Add NewsList component */}
        </BlogContainer>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  
  // Find category with name "News"
  const category = await CategoryModel.findOne({ name: 'News' });
  
  if (!category) {
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        newsProducts: [], // Return empty array if category "News" is not found
      },
    };
  }

  // Find products belonging to the "News" category
  const newsProducts = await Product.find({ category: category._id }, null, { sort: { '_id': -1 } });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      newsProducts: JSON.parse(JSON.stringify(newsProducts)), // Pass newsProducts as props
    },
  };
}
