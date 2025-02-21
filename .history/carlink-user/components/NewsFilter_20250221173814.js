import { useState } from "react";
import styled from "styled-components";

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

const Select = styled.select`
  width: 160px;
  padding: 10px 12px;
  padding-right: 32px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const ApplyFilterButton = styled(FilterButton)`
  padding: 10px 20px;
  white-space: nowrap;
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

export default function FilterSection({ products, setFilteredProducts }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterProducts();
  };

  const handleTypeClick = (type) => {
    setSelectedType(type === selectedType ? "" : type);
    filterProducts();
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
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
        <ControlsGroup>
          <Select value={selectedBrand} onChange={handleBrandChange}>
            <option value="">All Brands</option>
            {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
          </Select>
          <ApplyFilterButton onClick={filterProducts}>Apply</ApplyFilterButton>
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
    </FilterContainer>
  );
}
