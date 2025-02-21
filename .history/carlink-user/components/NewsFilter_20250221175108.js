import { useState } from "react";
import styled from "styled-components";

const TopicsHeader = styled.h2`
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
  padding: 10px 16px;
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

const ClearFilterButton = styled(FilterButton)`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;

  &:hover {
    background-color: #d32f2f;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const PageButton = styled(FilterButton)`
  background-color: ${(props) => (props.selected ? "#3b82f6" : "#f1f5f9")};
`;

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
    setFilteredProducts(filteredProducts);
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

  return (
    <FilterContainer>
      <FilterGroup>
        <TopicsHeader>Topics</TopicsHeader>
        <ButtonGroup>
          {types.map(type => (
            <FilterButton 
              key={type} 
              selected={type === selectedType}
              onClick={() => setSelectedType(type === selectedType ? "" : type)}
            >
              {type}
            </FilterButton>
          ))}
        </ButtonGroup>

        <TopicsHeader>Brands</TopicsHeader>
        <ButtonGroup>
          {brands.map(brand => (
            <FilterButton 
              key={brand} 
              selected={brand === selectedBrand}
              onClick={() => setSelectedBrand(brand === selectedBrand ? "" : brand)}
            >
              {brand}
            </FilterButton>
          ))}
        </ButtonGroup>

        <ControlsGroup>
          <ApplyFilterButton onClick={handleApplyFilters}>Apply Filters</ApplyFilterButton>
          <ClearFilterButton onClick={handleClearFilters}>Clear</ClearFilterButton>
        </ControlsGroup>
      </FilterGroup>

      <PaginationContainer>
        {totalPages > 1 && (
          Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index + 1}
              selected={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))
        )}
      </PaginationContainer>

      {/* Render the current items (news) based on filtered results */}
      {currentItems.map(product => (
        <div key={product._id}>{product.title}</div> // Adjust this according to your product structure
      ))}
    </FilterContainer>
  );
}
