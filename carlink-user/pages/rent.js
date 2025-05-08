import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import Title from "@/components/Title";
import ProductList from "@/components/ProductList";
import ProductFilter from "@/components/filters/ProductFilter";
import Footer from "@/components/Footer";
import RentList from "@/components/RentList";

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const FilterContainer = styled.div`
  flex: 1;
  max-width: 300px;
`;

const ListContainer = styled.div`
  flex: 3;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
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

export default function ProductsPage({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle filter changes
  const handleFilterChange = (filters) => {
    let filtered = products;

    if (filters.SearchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(filters.SearchTerm.toLowerCase())
      );
    }
    if (filters.Fuel) {
      filtered = filtered.filter((product) =>
        product.properties.some((prop) => prop.Fuel === filters.Fuel)
      );
    }
    if (filters.Miles) {
      filtered = filtered.filter((product) =>
        product.properties.some((prop) => prop.Miles === filters.Miles)
      );
    }
    if (filters.Transmission) {
      filtered = filtered.filter((product) =>
        product.properties.some((prop) => prop.Transmission === filters.Transmission)
      );
    }
    if (filters.Color) {
      filtered = filtered.filter((product) =>
        product.properties.some((prop) => prop.Color === filters.Color)
      );
    }
    if (filters.Door) {
      filtered = filtered.filter((product) =>
        product.properties.some((prop) => prop.Door === filters.Door)
      );
    }
    if (filters.Cylinder) {
      filtered = filtered.filter((product) =>
        product.properties.some((prop) => prop.Cylinder === filters.Cylinder)
      );
    }
    if (filters.EngineSize) {
      filtered = filtered.filter((product) =>
        product.properties.some((prop) => prop.EngineSize === filters.EngineSize)
      );
    }
    if (filters.Year) {
      filtered = filtered.filter((product) =>
        product.properties.some((prop) => prop.Year === filters.Year)
      );
    }
    if (filters.Model) {
      filtered = filtered.filter((product) =>
        product.properties.some((prop) => prop.Model === filters.Model)
      );
    }
    if (filters.Condition) {
      filtered = filtered.filter((product) =>
        product.properties.some((prop) => prop.Condition === filters.Condition)
      );
    }
    if (filters.MinPrice || filters.MaxPrice) {
      const minPrice = filters.MinPrice ? parseFloat(filters.MinPrice) : 0;
      const maxPrice = filters.MaxPrice ? parseFloat(filters.MaxPrice) : Infinity;
      filtered = filtered.filter((product) => {
        const price = product.price;
        return price >= minPrice && price <= maxPrice;
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filters are applied
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <Center>
        <Title>Rent Products</Title>
        <ProductsContainer>
          <FilterContainer>
            <ProductFilter products={products} onFilterChange={handleFilterChange} />
          </FilterContainer>
          <ListContainer>
            <RentList products={currentProducts} />
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
          </ListContainer>
        </ProductsContainer>
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  // Find the "Tesla" category ID
  const teslaCategory = await Category.findOne({ name: "Rent" });

  let products = [];
  if (teslaCategory) {
    // Fetch only products that belong to the Tesla category
    products = await Product.find({ category: teslaCategory._id }, null, { sort: { '_id': -1 } });
  }

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
