import { useState } from "react";
import styled from "styled-components";

const PageLayout = styled.div`
  position: relative;
`;

const SearchOuterContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 16px;
`;

const Header = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 24px 0;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CategorySection = styled.div`
  margin-bottom: 8px;
`;

const CategoryHeader = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  margin: 0 0 12px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background-color: ${props => props.selected ? '#2563eb' : '#f3f4f6'};
  color: ${props => props.selected ? '#ffffff' : '#4b5563'};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.selected ? '#1d4ed8' : '#e5e7eb'};
  }
`;

const ActionButton = styled.button`
  padding: 8px 24px;
  border-radius: 6px;
  border: none;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const ClearButton = styled.button`
  padding: 8px 24px;
  border-radius: 6px;
  border: none;
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const ControlsGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-right: 60px;
  margin-top: 20px;
  width: 250px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  padding-left: 32px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  background: #ffffff;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const SearchIcon = styled.svg`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
  width: 16px;
  height: 16px;
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
        (product.title?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.properties?.some(prop => 
          prop.Type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prop.Brand?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredProducts(filtered);
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
    if (event.target.value) {
      setSelectedTypes([]);
      setSelectedBrands([]);
    }
    filterProducts();
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedBrands([]);
    setSearchTerm("");
    setFilteredProducts(products);
  };

  return (
    <PageLayout>
        {/* Search bar positioned outside the white box at top right */}
        <SearchOuterContainer>
          <SearchContainer>
            <SearchIcon viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 3a5.5 5.5 0 014.227 9.02l4.127 4.127a.75.75 0 01-1.06 1.06l-4.127-4.127A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z" fill="currentColor"/>
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search..." 
              value={searchTerm} 
              onChange={handleSearchChange}
            />
          </SearchContainer>
        </SearchOuterContainer>
        
        <Container>
          <Header>Filters</Header>
          
          <FilterGroup>
          <CategorySection>
            <CategoryHeader>Topics</CategoryHeader>
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
          </CategorySection>

          <CategorySection>
            <CategoryHeader>Brands</CategoryHeader>
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
          </CategorySection>
          
          <ControlsGroup>
            <ActionButton onClick={filterProducts}>Apply</ActionButton>
            <ClearButton onClick={handleClearFilters}>Clear</ClearButton>
          </ControlsGroup>
        </FilterGroup>
      </Container>
    </PageLayout>
      
  );
}