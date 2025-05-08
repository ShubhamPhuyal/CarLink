import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

// Styled Components
const FilterWrapper = styled.div`
  background: white;
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 960px;
  margin: 0 auto;
`;

const FilterTitle = styled.h3`
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 16px;
  font-weight: 600;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

const SearchSection = styled.div`
  margin-bottom: 24px;
  width: 90%;
`;

const PriceSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const FilterGroup = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const BaseInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchInput = styled(BaseInput)``;

const PriceInput = styled(BaseInput)`
  width: 96px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
`;

const SearchButton = styled(Button)`
  background-color: #2563eb;
  color: white;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const ClearButton = styled(Button)`
  background-color: #f3f4f6;
  color: #374151;

  &:hover {
    background-color: #e5e7eb;
  }
`;

// Debounce hook
function useDebounce(callback, delay) {
  const debounce = useCallback(
    (...args) => {
      const handler = setTimeout(() => {
        callback(...args);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [callback, delay]
  );

  return debounce;
}

// Main Component
export default function ProductFilter({ products, onFilterChange }) {
  const initialFilters = {
    SearchTerm: "",
    Condition: "",
    Year: "",
    Model: "",
    Miles: "",
    MinPrice: "",
    MaxPrice: "",
    Fuel: "",
    Transmission: "",
    EngineSize: "",
    Cylinder: "",
    Color: "",
    Door: ""
  };

  const [filters, setFilters] = useState(initialFilters);
  const [priceOptions, setPriceOptions] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const prices = products.map((p) => p.price).filter(Boolean);
    if (prices.length > 0) {
      setPriceOptions({ min: Math.min(...prices), max: Math.max(...prices) });
    }
  }, [products]);

  // Safely extract unique options
  const getUniqueOptions = (key) => {
    const values = [];
    for (const p of products) {
      if (Array.isArray(p.properties)) {
        for (const prop of p.properties) {
          if (prop[key]) {
            values.push(prop[key]);
          }
        }
      }
    }
    return [...new Set(values)];
  };

  const filterOptions = {
    Condition: getUniqueOptions("Condition"),
    Year: getUniqueOptions("Year"),
    Model: getUniqueOptions("Model"),
    Miles: getUniqueOptions("Miles"),
    Fuel: getUniqueOptions("Fuel"),
    Transmission: getUniqueOptions("Transmission"),
    EngineSize: getUniqueOptions("EngineSize"),
    Cylinder: getUniqueOptions("Cylinder"),
    Color: getUniqueOptions("Color"),
    Door: getUniqueOptions("Door"),
  };

  const debounceFilterChange = useDebounce((newFilters) => {
    onFilterChange(newFilters);
  }, 500);

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === "number" ? parseFloat(value) || "" : value,
    };
    setFilters(newFilters);

    if (name === "SearchTerm") {
      debounceFilterChange(newFilters);
    } else {
      onFilterChange(newFilters);
    }
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    if (onFilterChange) {
      onFilterChange(initialFilters);
    }
  };

  const renderFilterGroup = (name, options) => (
    <FilterGroup key={name}>
      <Label htmlFor={name.toLowerCase()}>
        {name.replace(/([A-Z])/g, " $1").trim()}
      </Label>
      <Select
        id={name.toLowerCase()}
        name={name}
        onChange={handleFilterChange}
        value={filters[name]}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FilterGroup>
  );

  return (
    <FilterWrapper>
      <FilterTitle>Find Your Perfect Car</FilterTitle>

      <SearchSection>
        <FilterGroup>
          <Label htmlFor="searchTerm">Search</Label>
          <SearchInput
            type="text"
            id="searchTerm"
            name="SearchTerm"
            value={filters.SearchTerm}
            onChange={handleFilterChange}
            placeholder="Search by title"
          />
        </FilterGroup>
      </SearchSection>

      <PriceSection>
        <FilterGroup>
          <Label htmlFor="minPrice">Min Price</Label>
          <PriceInput
            type="number"
            id="minPrice"
            name="MinPrice"
            value={filters.MinPrice}
            onChange={handleFilterChange}
            placeholder={`From $${priceOptions.min}`}
          />
        </FilterGroup>
        <FilterGroup>
          <Label htmlFor="maxPrice">Max Price</Label>
          <PriceInput
            type="number"
            id="maxPrice"
            name="MaxPrice"
            value={filters.MaxPrice}
            onChange={handleFilterChange}
            placeholder={`To $${priceOptions.max}`}
          />
        </FilterGroup>
      </PriceSection>

      <FilterGrid>
        {renderFilterGroup("Condition", filterOptions.Condition)}
        {renderFilterGroup("Year", filterOptions.Year)}
        {renderFilterGroup("Model", filterOptions.Model)}
        {renderFilterGroup("Transmission", filterOptions.Transmission)}
        {renderFilterGroup("Fuel", filterOptions.Fuel)}
        {renderFilterGroup("Miles", filterOptions.Miles)}
        {renderFilterGroup("EngineSize", filterOptions.EngineSize)}
        {renderFilterGroup("Color", filterOptions.Color)}
        {renderFilterGroup("Door", filterOptions.Door)}
        {renderFilterGroup("Cylinder", filterOptions.Cylinder)}
      </FilterGrid>

      <ButtonGroup>
        <SearchButton onClick={() => onFilterChange(filters)}>Search</SearchButton>
        <ClearButton onClick={clearFilters}>Clear</ClearButton>
      </ButtonGroup>
    </FilterWrapper>
  );
}
