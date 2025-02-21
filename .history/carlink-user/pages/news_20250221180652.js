import { useState } from "react";  
import Header from "@/components/Header";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";  
import Title from "@/components/Title";
import NewsFeatured from "@/components/NewsFeatured";
import FilterSection from "@/components/NewsFilter";  
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NewsPage({ products }) {
    const [filteredProducts, setFilteredProducts] = useState(products);

    return (
      <>
        <Header />
        <Center>
          <NewsFeatured />
          <FilterSection products={products} setFilteredProducts={setFilteredProducts} />
          <Link href="/news-pagination?page=1">View All News</Link>
        </Center>
        <Footer />
      </>
    );
}

export async function getServerSideProps() {
  await mongooseConnect();
  
  // Find category with name "News"
  const category = await Category.findOne({ name: 'News' });
  
  if (!category) {
    return {
      props: {
        products: [],  // Return empty array if category "News" is not found
      },
    };
  }

  // Find products belonging to the "News" category
  const products = await Product.find({ category: category._id }, null, { sort: { '_id': -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
