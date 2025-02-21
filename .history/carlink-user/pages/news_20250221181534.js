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

const ITEMS_PER_PAGE = 5; // Adjust this value based on your needs

export default function NewsPage({ products }) {
    const [filteredProducts, setFilteredProducts] = useState(products); 
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
      <>
        <Header />
        <Center>
          <NewsFeatured />
          <FilterSection products={products} setFilteredProducts={setFilteredProducts} />
          <NewsList products={currentProducts} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </Center>
        <Footer />
      </>
    );
}

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    return (
        <div>
            {pages.map(page => (
                <button 
                    key={page} 
                    onClick={() => onPageChange(page)} 
                    style={{ 
                        fontWeight: page === currentPage ? 'bold' : 'normal', 
                        margin: '0 5px' 
                    }}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export async function getServerSideProps() {
  await mongooseConnect();
  
  const category = await Category.findOne({ name: 'News' });
  
  if (!category) {
    return {
      props: {
        products: [],
      },
    };
  }

  const products = await Product.find({ category: category._id }, null, { sort: { '_id': -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
