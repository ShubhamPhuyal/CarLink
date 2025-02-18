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

export default function HomePage({ FeaturedProduct, newTeslaProducts, newParts }) {
  return (
    <div>
      <Header />
      <Featured product={FeaturedProduct} />
      <BrandTicker />
      <Cta />
      
      {/* NewProducts filtered to only show Tesla category */}
      <NewProducts products={newTeslaProducts} />
      
      <NewParts products={newParts} /> {/* Add NewParts section */}
      <Features />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '678bb89ffc54cedc2cb7d9da';
  await mongooseConnect();

  const FeaturedProduct = await Product.findById(featuredProductId);
  const allProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 5 });

  // Find the "Tesla" category ID
  const teslaCategory = await Category.findOne({ name: "Tesla" });

  let newTeslaProducts = [];
  if (teslaCategory) {
    // Fetch products that belong to the Tesla category
    newTeslaProducts = await Product.find({ category: teslaCategory._id }, null, { sort: { '_id': -1 }, limit: 4 });
  }

  // Find the "Parts" category ID
  const partsCategory = await Category.findOne({ name: "Parts" });

  let newParts = [];
  if (partsCategory) {
    newParts = await Product.find({ category: partsCategory._id }, null, { sort: { '_id': -1 }, limit: 4 });
  }

  return {
    props: {
      FeaturedProduct: JSON.parse(JSON.stringify(FeaturedProduct)),
      newTeslaProducts: JSON.parse(JSON.stringify(newTeslaProducts)), // Filtered products for Tesla
      newParts: JSON.parse(JSON.stringify(newParts)), // Filtered parts
    },
  };
}
