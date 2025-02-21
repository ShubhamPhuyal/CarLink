import { useState } from "react";
import styled from "styled-components";

// Styled components
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
  padding: 8px 16px;
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

const ApplyFilterButton = styled(FilterButton)`
  padding: 10px 20px;
  background-color: #0066cc; // Full background color
  color: white; // White text
  border: none; // No border

  &:hover {
    background-color: #2563eb; // Darker blue on hover
  }
`;

const ClearButton = styled(FilterButton)`
  padding: 10px 20px;
  background-color: transparent; // Transparent background
  color: #0066cc; // Blue text
  border: 2px solid #3b82f6; // Blue border

  &:hover {
    background-color: #e0f2fe; // Light blue on hover
  }
`;

const ControlsGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
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
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const types = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Type)).filter(Boolean))];
  const brands = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Brand)).filter(Boolean))];

  const filterProducts = () => {
    let filtered = products;

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(product =>
        product.properties.some(prop => selectedTypes.includes(prop.Type))
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        product.properties.some(prop => selectedBrands.includes(prop.Brand))
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
    console.log("Filtered Products: ", filtered); // Debugging
  };

  const handleToggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleToggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    
    // Reset selected types and brands when a new search term is entered
    if (event.target.value) {
      setSelectedTypes([]);
      setSelectedBrands([]);
    }
    
    filterProducts(); // Call filterProducts whenever the search term changes
  };

  const handleApplyFilters = () => {
    filterProducts(); // Call filterProducts when the Apply button is clicked
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedBrands([]);
    setSearchTerm("");
    setFilteredProducts(products); // Reset to show all products
  };

  return (
    <FilterContainer>
      <FilterGroup>
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
