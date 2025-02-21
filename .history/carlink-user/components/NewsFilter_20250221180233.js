import { useState } from "react";
import styled from "styled-components";

// Define styled components
const FilterContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;
`;

const TopicsHeader = styled.h3`
  margin-bottom: 10px;
`;

const BrandsHeader = styled.h3`
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const FilterButton = styled.button`
  background-color: ${({ selected }) => (selected ? "#3b82f6" : "#e5e7eb")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: none;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #3b82f6;
    color: white;
  }
`;

const ControlsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ApplyFilterButton = styled.button`
  padding: 10px 15px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

const ClearButton = styled.button`
  padding: 10px 15px;
  background-color: #fca5a5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f87171;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const SearchInput = styled.input`
  padding: 10px 40px 10px 40px; // Padding for the search icon
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

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
  const itemsPerPage = 5;

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

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    setFilteredProducts(paginatedProducts);
    return { filtered, totalPages };
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
    setCurrentPage(1);
    setFilteredProducts(products);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    filterProducts();
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
