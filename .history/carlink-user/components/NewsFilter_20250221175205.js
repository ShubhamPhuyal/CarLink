import { useState } from "react";
import styled from "styled-components";

// ... [rest of your styled components]

export default function FilterSection({ products, setFilteredProducts }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const types = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Type)).filter(Boolean))];
  const brands = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Brand)).filter(Boolean))];

  const filterProducts = () => {
    let filtered = products;

    if (selectedType) {
      filtered = filtered.filter(product =>
        product.properties.some(prop => prop.Type === selectedType)
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(product =>
        product.properties.some(prop => prop.Brand === selectedBrand)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.properties?.some(prop => prop.Type?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.properties?.some(prop => prop.Brand?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  };

  const handleApplyFilters = () => {
    const filteredProducts = filterProducts();
    setFilteredProducts(filteredProducts); // Update the state with the filtered products
    setCurrentPage(1); // Reset to the first page
  };

  const handleClearFilters = () => {
    setSelectedType("");
    setSelectedBrand("");
    setSearchTerm("");
    setFilteredProducts(products); // Reset to show all products
    setCurrentPage(1); // Reset to the first page
  };

  // Use the currentItems for pagination
  const filteredProducts = filterProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Return JSX here...

  return (
    // Your JSX code with pagination and buttons
    <FilterContainer>
      {/* Filter UI Code */}
      {currentItems.map(product => (
        <NewsItem key={product._id} product={product} /> // Adjust this according to your NewsItem structure
      ))}
      
      {totalPages > 1 && (
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index + 1}
              selected={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </PaginationContainer>
      )}
    </FilterContainer>
  );
}
