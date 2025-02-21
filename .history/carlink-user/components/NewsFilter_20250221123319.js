import { useState } from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
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
  const [selectedFilters, setSelectedFilters] = useState({});

  // Extract all unique property names
  const propertyNames = [...new Set(products.flatMap(p => Object.keys(p.properties || {})))];

  // Generate filter options dynamically for each property
  const filterOptions = {};
  propertyNames.forEach((property) => {
    filterOptions[property] = [
      ...new Set(
        products
          .map(p => {
            const value = p.properties?.[property];
            return typeof value === "object" && value !== null
              ? Object.values(value)  // Extract values from object
              : value;
          })
          .flat()  // Flatten in case of arrays
          .filter(Boolean)  // Remove empty values
      )
    ];
  });

  const handleFilterChange = (property, value) => {
    const updatedFilters = { ...selectedFilters, [property]: value };

    setSelectedFilters(updatedFilters);

    let filtered = products;

    Object.entries(updatedFilters).forEach(([key, val]) => {
      if (val) {
        filtered = filtered.filter(product => {
          const propValue = product.properties?.[key];

          if (typeof propValue === "object" && propValue !== null) {
            return Object.values(propValue).includes(val); // Check values inside object
          }

          return propValue === val; // Normal comparison for strings/numbers
        });
      }
    });

    setFilteredProducts(filtered);
  };

  return (
    <FilterContainer>
      {propertyNames.map((property) => (
        <Select
          key={property}
          value={selectedFilters[property] || ""}
          onChange={(e) => handleFilterChange(property, e.target.value)}
        >
          <option value="">{`All ${property}`}</option>
          {filterOptions[property].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      ))}
    </FilterContainer>
  );
}
