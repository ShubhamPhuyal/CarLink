import { useState } from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
`;

const SearchInput = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  width: 200px; // Adjust width as needed
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
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

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter(product => 
        product.properties.some(prop => prop.Type === selectedType)
      );
    }

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter(product => 
        product.properties.some(prop => prop.Brand === selectedBrand)
      );
    }

    // Filter by search term (case insensitive)
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Assuming title is a property
        product.properties.some(prop => prop.Type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.properties.some(prop => prop.Brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <FilterContainer>
      <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">All Types</option>
        {types.map(type => <option key={type} value={type}>{type}</option>)}
      </Select>
      <Select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
        <option value="">All Brands</option>
        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
      </Select>
      <SearchInput 
        type="text" 
        placeholder="Search..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <FilterButton onClick={handleFilterChange}>Filter</FilterButton>
    </FilterContainer>
  );
}
