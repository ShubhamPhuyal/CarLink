import { useState } from "react";
import styled from "styled-components";

// Styled components
const TopicsHeader = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 12px;
`;

const BrandsHeader = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 12px;
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

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background-color: ${(props) => (props.selected ? "#3b82f6" : "#f1f5f9")};
  color: ${(props) => (props.selected ? "white" : "#64748b")};
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? "#2563eb" : "#e2e8f0")};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
  }
`;

const ControlsGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ApplyFilterButton = styled(FilterButton)`
  padding: 10px 20px;
  white-space: nowrap;
`;

const ClearButton = styled(FilterButton)`
  padding: 10px 20px;
  background-color: #e2e8f0;
  color: #64748b;

  &:hover {
    background-color: #d1d5db;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E");
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-position: center;
`;

const SearchInput = styled.input`
  width: 220px;
  padding: 10px 12px;
  padding-left: 38px;
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

// New styled components for pagination
const PaginationContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px; // Add some margin for spacing
`;

const PaginationButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background-color: ${(props) => (props.selected ? "#3b82f6" : "#f1f5f9")};
  color: ${(props) => (props.selected ? "white" : "#64748b")};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => (props.selected ? "#2563eb" : "#e2e8f0")};
  }
`;

export default function FilterSection({ products, setFilteredProducts }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

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

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleApplyFilters = () => {
    filterProducts();
  };

  const handleClearFilters = () => {
    setSelectedType("");
    setSelectedBrand("");
    setSearchTerm("");
    setFilteredProducts(products); // Reset to show all products
    setCurrentPage(1); // Reset to first page
  };

  // Use the products after filtering to calculate pagination
  const filtered = products.filter(product => {
    if (selectedType && !product.properties.some(prop => prop.Type === selectedType)) return false;
    if (selectedBrand && !product.properties.some(prop => prop.Brand === selectedBrand)) return false;
    if (searchTerm && !(
      (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      product.properties?.some(prop => prop.Type?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      product.properties?.some(prop => prop.Brand?.toLowerCase().includes(searchTerm.toLowerCase()))
    )) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

      {/* Pagination UI */}
      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationButton 
            key={index + 1} 
            selected={currentPage === index + 1} 
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PaginationButton>
        ))}
      </PaginationContainer>
    </FilterContainer>
  );
}
