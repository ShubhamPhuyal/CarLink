import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";  // Import Category model
import Title from "@/components/Title";
import ProductList from "@/components/ProductList";
import PartList from "@/components/PartList";

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Products</Title>
        <PartList products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
    await mongooseConnect();
  
    // Find the "Tesla" category ID
    const teslaCategory = await Category.findOne({ name: "Parts" });
  
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
