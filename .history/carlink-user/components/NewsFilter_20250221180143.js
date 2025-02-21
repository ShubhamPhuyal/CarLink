import { useState } from "react";
import styled from "styled-components";

// Existing styled-components and filter logic...

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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

export default function FilterSection({ products, setFilteredProducts }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set how many items per page

  const types = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Type)).filter(Boolean))];
  const brands = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Brand)).filter(Boolean))];

  // Filter products based on selected filters
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

    // Handle pagination for filtered results
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    setFilteredProducts(paginatedProducts);

    return { filtered, totalPages }; // Return both filtered products and totalPages for pagination
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type === selectedType ? "" : type);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand === selectedBrand ? "" : brand);
  };

  const handleApplyFilters = () => {
    filterProducts();
  };

  const handleClearFilters = () => {
    setSelectedType("");
    setSelectedBrand("");
    setSearchTerm("");
    setCurrentPage(1); // Reset page to 1 when clearing filters
    setFilteredProducts(products); // Reset to show all products
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    filterProducts(); // Reapply filter with new page
  };

  return (
    <FilterContainer>
      <FilterGroup>
        <TopicsHeader>Topics</TopicsHeader>
        <ButtonGroup>
          {types.map(type => (
            <FilterButton 
              key={type} 
              selected={type === selectedType}
              onClick={() => handleTypeClick(type)}
            >
              {type}
            </FilterButton>
          ))}
        </ButtonGroup>

        <BrandsHeader>Brands</BrandsHeader>
        <ButtonGroup>
          {brands.map(brand => (
            <FilterButton 
              key={brand} 
              selected={brand === selectedBrand}
              onClick={() => handleBrandClick(brand)}
            >
              {brand}
            </FilterButton>
          ))}
        </ButtonGroup>
        
        <ControlsGroup>
          <ApplyFilterButton onClick={handleApplyFilters}>Apply</ApplyFilterButton>
          <ClearButton onClick={handleClearFilters}>Clear</ClearButton>
        </ControlsGroup>
      </FilterGroup>

      <SearchWrapper>
        <SearchIcon />
        <SearchInput 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={handleSearchChange}
        />
      </SearchWrapper>

      {/* Pagination controls */}
      <PaginationContainer>
        <PageButton 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
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
          disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
        >
          Next
        </PageButton>
      </PaginationContainer>
    </FilterContainer>
  );
}
