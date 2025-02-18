import BrandTicker from '@/components/BrandTicker';
import Cta from '@/components/Cta';
import Featured from '@/components/Featured';
import Features from '@/components/Features';
import Header from '@/components/Header';
import NewProducts from '@/components/NewProducts';
import NewParts from '@/components/NewParts'; // Import NewParts component
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import React from 'react';

export default function HomePage({ FeaturedProduct, newProducts, newParts }) {
  return (
    <div>
      <Header />
      <Featured product={FeaturedProduct} />
      <BrandTicker />
      <Cta />
      <NewProducts products={newProducts} />
      <NewProducts products={newParts} /> {/* Add NewParts section */}
      <Features />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '678bb89ffc54cedc2cb7d9da';
  await mongooseConnect();

  const FeaturedProduct = await Product.findById(featuredProductId);
  const allProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });

  // Filter products where category is "Parts"
  const newParts = allProducts.filter(product => product.category === "Parts");

  return {
    props: {
      FeaturedProduct: JSON.parse(JSON.stringify(FeaturedProduct)),
      newProducts: JSON.parse(JSON.stringify(allProducts)), // Keeping original newProducts
      newParts: JSON.parse(JSON.stringify(newParts)), // Pass filtered parts
    },
  };
}
