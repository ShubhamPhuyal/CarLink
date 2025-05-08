import { useState } from "react";  
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";  
import Title from "@/components/Title";
import PartList from "@/components/PartList";
import FilterSection from "@/components/filters/PartFilter";  
import Footer from "@/components/Footer";

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterContainer = styled.div`
  flex: 1;
  max-width: 300px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ListContainer = styled.div`
  flex: 3;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const PaginationButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#3b82f6" : "#f1f5f9")};
  color: ${(props) => (props.selected ? "white" : "#64748b")};
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: ${(props) => (props.selected ? "#2563eb" : "#e2e8f0")};
  }
`;

export default function PartsPage({ products }) {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleFilterChange = (filters) => {
        let filtered = [...products];

        // Apply search filter
        if (filters.SearchTerm) {
            const searchTerm = filters.SearchTerm.toLowerCase();
            filtered = filtered.filter(product => 
                product.title.toLowerCase().includes(searchTerm) ||
                (product.description && product.description.toLowerCase().includes(searchTerm))
            );
        }

        // Apply price filters
        if (filters.MinPrice || filters.MaxPrice) {
            const minPrice = filters.MinPrice ? parseFloat(filters.MinPrice) : 0;
            const maxPrice = filters.MaxPrice ? parseFloat(filters.MaxPrice) : Infinity;
            filtered = filtered.filter(product => {
                const price = product.price;
                return price >= minPrice && price <= maxPrice;
            });
        }

        // Apply property filters
        ['Weight', 'Color', 'Condition'].forEach(prop => {
            if (filters[prop]) {
                filtered = filtered.filter(product => 
                    product.properties?.some(p => p[prop] === filters[prop])
                );
            }
        });

        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Optionally scroll to top when changing pages
        window.scrollTo(0, 0);
    };

    return (
        <>
            <Header />
            <Center>
                <Title>All Parts</Title>
                <ProductsContainer>
                    <FilterContainer>
                        <FilterSection 
                            parts={products} 
                            onFilterChange={handleFilterChange}
                        />
                    </FilterContainer>
                    <ListContainer>
                        <PartList products={currentProducts} />
                        {/* Only show pagination if there's more than one page */}
                        {totalPages > 0 && (
                            <PaginationContainer>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <PaginationButton 
                                        key={index + 1} 
                                        selected={currentPage === index + 1} 
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationButton>
                                ))}
                            </PaginationContainer>
                        )}
                    </ListContainer>
                </ProductsContainer>
            </Center>
            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    
    const category = await Category.findOne({ name: 'Parts' });
    
    if (!category) {
        return { props: { products: [] } };
    }

    const products = await Product.find({ category: category._id }, null, { sort: { '_id': -1 } });

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}