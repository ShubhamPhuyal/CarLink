// components/SearchBar.js
import React, { useState } from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  width: 220px;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

export default function SearchBar({ products = [], setFilteredProducts }) { // Default empty array for products
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      const searchFiltered = products.filter(product =>
        (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.properties?.some(prop => prop.Type?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.properties?.some(prop => prop.Brand?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProducts(searchFiltered);
    }
  };

  return (
    <SearchInput 
      type="text" 
      placeholder="Search..." 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)} 
      onKeyDown={handleSearchKeyPress}
    />
  );
}
