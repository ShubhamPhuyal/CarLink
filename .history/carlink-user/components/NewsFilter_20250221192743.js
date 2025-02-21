import { useState } from "react";
import { Filter } from "lucide-react";
import styled from "styled-components";

// Rest of the styled components remain the same...
// [Previous styled components code until FilterIconWrapper]

const FilterIconWrapper = styled.div`
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? '#3b82f6' : 'transparent'};
  transition: all 0.2s ease;
  color: ${props => props.active ? '#ffffff' : '#64748b'};

  &:hover {
    background-color: ${props => props.active ? '#2563eb' : '#f1f5f9'};
  }

  svg {
    stroke: currentColor;
  }
`;

// Rest of the component implementation remains the same...
export default function FilterSection({ products, setFilteredProducts }) {
  // ... previous state and functions remain the same ...

  return (
    <FilterContainer>
      <FilterGroup show={showFilters}>
        {/* ... previous FilterGroup content remains the same ... */}
      </FilterGroup>

      <SearchWrapper>
        <SearchIcon />
        <SearchInput 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={handleSearchChange}
        />
        <FilterIconWrapper 
          active={showFilters}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} />
        </FilterIconWrapper>
      </SearchWrapper>
    </FilterContainer>
  );
}