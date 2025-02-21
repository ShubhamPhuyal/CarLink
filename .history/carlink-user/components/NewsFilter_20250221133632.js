import { useState } from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(to right, #ffffff, #f8f9fa);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;

  &::after {
    content: '▼';
    font-size: 12px;
    color: #666;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 35px 12px 15px;
  border-radius: 8px;
  border: 2px solid #e1e4e8;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  color: #2c3e50;
  appearance: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c0c6cc;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const SearchInput = styled.input`
  flex: 2;
  min-width: 250px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #e1e4e8;
  background-color: white;
  font-size: 14px;
  color: #2c3e50;
  transition: all 0.2s ease;

  &::placeholder {
    color: #95a5a6;
  }

  &:hover {
    border-color: #c0c6cc;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const FilterButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
    background: linear-gradient(135deg, #0056b3, #004494);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function FilterSection({ products, setFilteredProducts }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const types = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Type)).filter(Boolean))];
  const brands = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Brand)).filter(Boolean))];

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
    if (e.key === 'Enter') {
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
      <SelectWrapper>
        <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">All Types</option>
          {types.map(type => <option key={type} value={type}>{type}</option>)}
        </Select>
      </SelectWrapper>
      <SelectWrapper>
        <Select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="">All Brands</option>
          {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
        </Select>
      </SelectWrapper>
      <SearchInput 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        onKeyDown={handleSearchKeyPress}
      />
      <FilterButton onClick={handleFilterChange}>Apply Filters</FilterButton>
    </FilterContainer>
  );
}