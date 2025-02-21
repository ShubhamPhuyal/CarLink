import { useState } from "react";
import { Filter } from "lucide-react";
import styled from "styled-components";

// Previous styled components remain the same until FilterContainer

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 1rem;
  gap: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

// Rest of the styled components remain the same

export default function FilterSection({ products, setFilteredProducts }) {
  // State and functions remain the same

  return (
    <FilterContainer>
      <SearchBar>
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
      </SearchBar>

      <FilterGroup show={showFilters}>
        <TopicsHeader>Topics</TopicsHeader>
        <ButtonGroup>
          {types.map(type => (
            <FilterButton 
              key={type} 
              selected={selectedTypes.includes(type)}
              onClick={() => handleToggleType(type)}
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
              selected={selectedBrands.includes(brand)}
              onClick={() => handleToggleBrand(brand)}
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
    </FilterContainer>
  );
}