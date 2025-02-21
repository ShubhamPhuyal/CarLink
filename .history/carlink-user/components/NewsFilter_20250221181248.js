import { useEffect, useState } from "react";
import styled from "styled-components";

// Styled components
const FilterContainer = styled.div`
  // Add your styles here
`;

const FilterGroup = styled.div`
  // Add your styles here
`;

const TopicsHeader = styled.h3`
  // Add your styles here
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button`
  // Add your styles here
  background-color: ${({ selected }) => (selected ? '#007bff' : '#f8f9fa')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
`;

const BrandsHeader = styled.h3`
  // Add your styles here
`;

const ControlsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ApplyFilterButton = styled.button`
  // Add your styles here
`;

const ClearButton = styled.button`
  // Add your styles here
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchIcon = styled.span`
  // Add your styles here (e.g., an icon)
`;

const SearchInput = styled.input`
  // Add your styles here
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  // Add your styles here
  margin: 0 0.5rem;
`;

// Main FilterSection component
export default function FilterSection({ products, setFilteredProducts }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set your items per page
  const [filteredProducts, setFilteredProductsState] = useState(products);

  const types = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Type)).filter(Boolean))];
  const brands = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Brand)).filter(Boolean))];

  useEffect(() => {
    filterProducts(); // Filter products whenever the products or filters change
  }, [products, selectedType, selectedBrand, searchTerm]);

  const filterProducts = () => {
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

    if (searchTerm) {
      filtered = filtered.filter(product =>
        (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.properties?.some(prop => prop.Type?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.properties?.some(prop => prop.Brand?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProductsState(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type === selectedType ? "" : type);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand === selectedBrand ? "" : brand);
  };

  const handleApplyFilters = () => {
    filterProducts();
  };

  const handleClearFilters = () => {
    setSelectedType("");
    setSelectedBrand("");
    setSearchTerm("");
    setFilteredProductsState(products); // Reset to show all products
    setCurrentPage(1); // Reset to first page
  };

  return (
    <FilterContainer>
      <FilterGroup>
        <TopicsHeader>Topics</TopicsHeader>
        <ButtonGroup>
          {types.map(type => (
            <FilterButton 
              key={type} 
              selected={type === selectedType}
              onClick={() => handleTypeClick(type)}
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
              selected={brand === selectedBrand}
              onClick={() => handleBrandClick(brand)}
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

      {/* Pagination */}
      <PaginationContainer>
        <PageButton 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton 
            key={index + 1} 
            onClick={() => handlePageChange(index + 1)} 
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
        <PageButton 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </PaginationContainer>
    </FilterContainer>
  );
}
