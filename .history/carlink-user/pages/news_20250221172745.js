import { useState } from "react";  // ✅ Import useState
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";  
import Title from "@/components/Title";
import ProductList from "@/components/ProductList";
import PartList from "@/components/PartList";
import NewsList from "@/components/NewsList";
import NewsFeatured from "@/components/NewsFeatured";
import FilterSection from "@/components/NewsFilter";  // ✅ Import the filter section
import Footer from "@/components/Footer";

export default function NewsPage({ products }) {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchTerm, setSearchTerm] = useState("");  // State to hold the search term

    const handleSearch = (term) => {
        setSearchTerm(term);
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(term.toLowerCase()) ||
            product.description.toLowerCase().includes(term.toLowerCase()) // Adjust based on your data structure
        );
        setFilteredProducts(filtered);
    };

    return (
      <>
        <Header />
        <Center>
          <NewsFeatured onSearch={handleSearch}/>  {/* Pass handleSearch to NewsFeatured */}
          <FilterSection onSearch={handleSearch} /> {/* Include filter */}
          <NewsList products={filteredProducts} />
        </Center>
        <Footer/>
      </>
    );
}
