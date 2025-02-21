import { useState } from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-right: auto;
  flex-wrap: wrap;
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
  background-color: ${(props) => (props.selected ? "#2563eb" : "#e0e0e0")};
  color: ${(props) => (props.selected ? "white" : "#333")};
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#1d4ed8" : "#d1d5db")};
  }
`;

const Select = styled.select`
  width: 160px;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  appearance: none;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

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

export default function FilterSection({ products, setFilteredProducts }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const types = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Type)).filter(Boolean))];
  const brands = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Brand)).filter(Boolean))];

  const handleTypeClick = (type) => {
    setSelectedType(type === selectedType ? "" : type); // Toggle selection
  };

  const handleFilterChange = () => {
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

    setFilteredProducts(filtered);
  };

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
    <FilterContainer>
      <FilterGroup>
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

        <Select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="">All Brands</option>
          {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
        </Select>

        <FilterButton onClick={handleFilterChange}>Filter</FilterButton>
      </FilterGroup>

      <SearchInput 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        onKeyDown={handleSearchKeyPress}
      />
    </FilterContainer>
  );
}
