import BrandTicker from '@/components/BrandTicker';
import Cta from '@/components/Cta';
import Featured from '@/components/Featured';
import Features from '@/components/Features';
import Header from '@/components/Header';
import NewProducts from '@/components/NewProducts';
import NewParts from '@/components/NewParts'; // Import NewParts component
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category'; // Import Category model
import React from 'react';
import Footer from '@/components/Footer';


export default function HomePage({ FeaturedProduct, newProducts, newParts }) {
  return (
    <div>
      <Header />
      <Featured product={FeaturedProduct} />
      <BrandTicker />
      <Cta />
      <NewProducts products={newProducts} />
      <Features />
      <Title>
        <Heading>Car Parts & Accessories</Heading>
        <Label>Book them now before they sell out</Label>
      </Title>
      <NewParts products={newParts} />
      <Footer/> {/* Add NewParts section */}
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '678bb89ffc54cedc2cb7d9da';
  await mongooseConnect();

  const FeaturedProduct = await Product.findById(featuredProductId);
  const allProducts = await Product.find({}, null, { sort: { '_id': 1 }, limit: 5 });

  // Find the "Parts" category ID
  const partsCategory = await Category.findOne({ name: "Parts" });

  let newParts = [];
  if (partsCategory) {
    newParts = await Product.find({ category: partsCategory._id }, null, { sort: { '_id': -1 }, limit: 5 });
  }

  return {
    props: {
      FeaturedProduct: JSON.parse(JSON.stringify(FeaturedProduct)),
      newProducts: JSON.parse(JSON.stringify(allProducts)), // Keeping original newProducts
      newParts: JSON.parse(JSON.stringify(newParts)), // Pass filtered parts
    },
  };
}
