import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";  // Import Category model
import Title from "@/components/Title";
import ProductList from "@/components/ProductList";
import PartList from "@/components/PartList";
import NewsList from "@/components/NewsList";
import NewsFeatured from "@/components/NewsFeatured";
import FilterSection from "@/components/NewsFilter";

export default function NewsPage({ products }) {
    const [filteredProducts, setFilteredProducts] = useState(products); // Manage filtered results
  
    return (
      <>
        <Header />
        <Center>
          <NewsFeatured />
          <FilterSection products={products} setFilteredProducts={setFilteredProducts} /> 
          <NewsList products={filteredProducts} />  
        </Center>
      </>
    );
  }
  
  export async function getServerSideProps() {
    await mongooseConnect();
  
    const category = await Category.findOne({ name: "News" });
  
    if (!category) {
      return {
        props: {
          products: [],
        },
      };
    }
  
    const products = await Product.find({ category: category._id }, null, { sort: { _id: -1 } });
  
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  }
