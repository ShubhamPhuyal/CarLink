import { FaCar, FaGasPump, FaCogs, FaCalendarAlt, FaRoad, FaTint, FaBuilding, FaCube, FaLeaf, FaCarBattery } from "react-icons/fa"; // Add FaCarBattery
import Center from "@/components/Center"; 
import Header from "@/components/Header"; 
import Title from "@/components/Title"; 
import { mongooseConnect } from "@/lib/mongoose"; 
import { Product } from "@/models/Product"; 
import styled from "styled-components"; 
import ProductImages from "@/components/ProductImages"; 
import CartIcon from "@/components/icons/CartIcon";

const iconColor = "#3361E0"; // Icon color

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const BoxCommonStyles = `
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LeftColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 65%;
  gap: 20px;
`;

const ProductBox = styled.div`
  ${BoxCommonStyles}
  margin: 0;
`;

const RightColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 35%;
  gap: 20px;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescriptionWrapper = styled.div`
  ${BoxCommonStyles}
  display: flex;
  flex-direction: column;
`;

const DescriptionHeader = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
`;

const Description = styled.p`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.6;
  color: #666;
  margin: 20px 0;
`;

const PriceWrapper = styled.div`
  ${BoxCommonStyles}
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  gap: 10px;
`;

const PriceLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const Price = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c2c2c;
`;

const AddToCartButton = styled.button`
  background-color: #0066ff;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: center;
  margin-top: 10px;

  &:hover {
    background-color: #0052cc;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ProductTitle = styled(Title)`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

const SpecificationsBox = styled.div`
  ${BoxCommonStyles}
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SpecificationsHeader = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

const SpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #666;
  margin-bottom: 8px;
`;

export default function ProductPage({ product }) {


  // Assuming product.properties is an array containing an object with property data
  const properties = product.properties && product.properties[0] ? product.properties[0] : {};

  return (
    <>
      <Header />
      <Center>
        <ProductTitle>{product.title}</ProductTitle>
        <ColWrapper>
          <LeftColumnWrapper>
            <ProductBox>
              <ProductImages images={product.images.map(image => `http://localhost:3000${image}`)} />
            </ProductBox>
            <DescriptionWrapper>
              <DescriptionHeader>Description</DescriptionHeader>
              <Description>{product.description}</Description>
            </DescriptionWrapper>
          </LeftColumnWrapper>
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
