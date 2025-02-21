import { FaCar, FaGasPump, FaCogs, FaCalendarAlt, FaRoad, FaTint, FaBuilding, FaCube, FaLeaf, FaCarBattery } from "react-icons/fa";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";

const ColWrapper = styled.div`
  max-width: 800px;
  margin: 40px auto;
`;

const ProductBox = styled.div`
  margin-bottom: 40px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ProductTitle = styled(Title)`
  font-size: 2.8rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 40px 0;
  text-align: center;
  line-height: 1.3;
`;

const DescriptionWrapper = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const DescriptionHeader = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.8;
  color: #444;
  margin: 0;
`;

export default function ProductPage({ product }) {
  return (
    <>
      <Header />
      <Center>
        <ProductTitle>{product.title}</ProductTitle>
        <ColWrapper>
          <ProductBox>
            <ProductImages images={product.images.map(image => `http://localhost:3000${image}`)} />
          </ProductBox>
          <DescriptionWrapper>
            <DescriptionHeader>Description</DescriptionHeader>
            <Description>{product.description}</Description>
          </DescriptionWrapper>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}