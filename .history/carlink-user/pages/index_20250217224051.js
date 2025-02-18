import BrandTicker from '@/components/BrandTicker';
import Cta from '@/components/Cta';
import Featured from '@/components/Featured';
import Features from '@/components/Features';
import Header from '@/components/Header';
import NewProducts from '@/components/NewProducts';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import React from 'react';

export default function HomePage({FeaturedProduct,newProducts}) {
  return (
    <div>
      <Header />
      
      <Featured product={FeaturedProduct}/>
      <BrandTicker />
      <Cta />
      <NewProducts products={newProducts} />
      <Features />
    </div>
    
  );
}

export async function getServerSideProps() {
 const featuredProductId = '678bb89ffc54cedc2cb7d9da';
 await mongooseConnect();
 const FeaturedProduct = await Product.findById(featuredProductId);
 const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  return {
    props: {
      FeaturedProduct: JSON.parse(JSON.stringify(FeaturedProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}