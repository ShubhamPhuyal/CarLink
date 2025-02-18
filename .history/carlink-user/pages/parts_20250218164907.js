import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";  // Import Category model
import Title from "@/components/Title";
import ProductList from "@/components/ProductList";

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Products</Title>
        <New products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  
  // Find category with name "Parts"
  const category = await Category.findOne({ name: 'Parts' });
  
  if (!category) {
    return {
      props: {
        products: [],  // Return empty array if category "Parts" is not found
      },
    };
  }

  // Find products belonging to the "Parts" category
  const products = await Product.find({ category: category._id }, null, { sort: { '_id': -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
