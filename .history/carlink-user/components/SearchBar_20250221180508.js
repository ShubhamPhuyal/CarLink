import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsList from "@/components/NewsList";
import FilterSection from "@/components/NewsFilter";

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

export default function NewsPagination({ products }) {
  const router = useRouter();
  const { page = 1 } = router.query; // Get the current page from the query parameters
  const currentPage = Number(page);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const itemsPerPage = 5; // Adjust this to set how many items per page
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Calculate the products to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    router.push(`/news-pagination?page=${newPage}`); // Navigate to the new page
  };

  useEffect(() => {
    setFilteredProducts(products); // Reset filtered products when the page changes
  }, [products]);

  return (
    <>
      <Header />
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
