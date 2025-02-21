import { useState, useEffect } from "react";
import styled from "styled-components";

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

const FilterContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 20px;
`;

// Other styled components...

export default function FilterSection({ products, setFilteredProducts }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust this for how many items to display per page

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

    // Reset to the first page when filtering
    setCurrentPage(1);
    setFilteredProducts(filtered);
  };

  const handleApplyFilters = () => {
    filterProducts();
  };

  const handleClearFilters = () => {
    setSelectedType("");
    setSelectedBrand("");
    setSearchTerm("");
    setCurrentPage(1; // Reset to first page
    setFilteredProducts(products); // Reset to show all products
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <FilterContainer>
      {/* Filter buttons for Types and Brands... */}

      <PaginationContainer>
        <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
        <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </PageButton>
      </PaginationContainer>

      {/* Search input */}
    </FilterContainer>
  );
}
