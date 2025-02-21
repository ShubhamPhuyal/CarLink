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

export default function FilterSection({ products, setFilteredProducts }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

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

  return (
    <FilterContainer>
      <Select value={selectedType} onChange={(e) => { setSelectedType(e.target.value); handleFilterChange(); }}>
        <option value="">All Types</option>
        {types.map(type => <option key={type} value={type}>{type}</option>)}
      </Select>
      <Select value={selectedBrand} onChange={(e) => { setSelectedBrand(e.target.value); handleFilterChange(); }}>
        <option value="">All Brands</option>
        {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
      </Select>
    </FilterContainer>
  );
}
