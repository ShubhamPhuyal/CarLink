import { useState } from "react";  
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";  
import Title from "@/components/Title";
import NewsList from "@/components/NewsList";
import NewsFeatured from "@/components/NewsFeatured";
import FilterSection from "@/components/NewsFilter";  
import Footer from "@/components/Footer";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 4px;
  border: none;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export default function NewsPage({ products }) {
    const [filteredProducts, setFilteredProducts] = useState(products); 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Adjust this to set how many items per page

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    
    // Calculate the products to display for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    return (
      <>
        <Header />
        <Center>
          <NewsFeatured />
          <FilterSection products={products} setFilteredProducts={setFilteredProducts} />
          <NewsList products={currentProducts} />
          <PaginationContainer>
            <PageButton 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              Previous
            </PageButton>
            {Array.from({ length: totalPages }, (_, index) => (
              <PageButton 
                key={index + 1} 
                onClick={() => handlePageChange(index + 1)} 
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </PageButton>
            ))}
            <PageButton 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Next
            </PageButton>
          </PaginationContainer>
        </Center>
        <Footer />
      </>
    );
}

export async function getServerSideProps() {
  await mongooseConnect();
  
  // Find category with name "News"
  const category = await Category.findOne({ name: 'News' });
  
  if (!category) {
    return {
      props: {
        products: [],  // Return empty array if category "News" is not found
      },
    };
  }

  // Find products belonging to the "News" category
  const products = await Product.find({ category: category._id }, null, { sort: { '_id': -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
