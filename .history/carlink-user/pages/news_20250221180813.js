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
import NewsPagination from "@/components/NewsPagination"; // Import the NewsPagination component

export default function NewsPage({ products }) {
    const [filteredProducts, setFilteredProducts] = useState(products); 

    return (
      <>
        <Header />
        <Center>
          <NewsFeatured />
          <FilterSection products={products} setFilteredProducts={setFilteredProducts} />
          <NewsList products={filteredProducts} /> {/* Display the filtered news list */}
          <NewsPagination products={filteredProducts} /> {/* Add pagination after the list */}
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
