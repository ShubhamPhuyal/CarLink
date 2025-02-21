import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Header = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const BaseButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FilterButton = styled(BaseButton)`
  background-color: ${props => props.selected ? '#2563eb' : '#f3f4f6'};
  color: ${props => props.selected ? '#ffffff' : '#4b5563'};

  &:hover {
    background-color: ${props => props.selected ? '#1d4ed8' : '#e5e7eb'};
  }
`;

const ActionButton = styled(BaseButton)`
  background-color: #2563eb;
  color: #ffffff;
  min-width: 100px;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const ControlsGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  margin-left: auto;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
  
  &::before {
    content: '🔍';
    font-size: 16px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-left: 40px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  color: #1f2937;
  background: #f9fafb;
  transition: all 0.2s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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
    <Container>
      <FilterGroup>
        <Section>
          <Header>Topics</Header>
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
        </Section>

        <Section>
          <Header>Brands</Header>
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
        </Section>
        
        <ControlsGroup>
          <ActionButton onClick={filterProducts}>Apply</ActionButton>
          <ActionButton onClick={handleClearFilters}>Clear</ActionButton>
        </ControlsGroup>
      </FilterGroup>

      <SearchContainer>
        <SearchIcon />
        <SearchInput 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={handleSearchChange}
        />
      </SearchContainer>
    </Container>
  );
}