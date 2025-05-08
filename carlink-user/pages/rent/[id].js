import { FaCar, FaGasPump, FaCogs, FaCalendarAlt, FaRoad, FaTint, FaBuilding, FaCube, FaLeaf, FaCarBattery, FaComments } from "react-icons/fa";
import Center from "@/components/Center"; 
import Header from "@/components/Header"; 
import Title from "@/components/Title"; 
import { mongooseConnect } from "@/lib/mongoose"; 
import { Product } from "@/models/Product"; 
import styled from "styled-components"; 
import ProductImages from "@/components/ProductImages"; 
import CartIcon from "@/components/icons/CartIcon";
import Link from 'next/link';
import { useState } from "react";
import BookingModal from "@/components/bookform/BookingModal";

const iconColor = "#3361E0";

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  gap: 30px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const BoxCommonStyles = `
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
`;

const LeftColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 65%;
  gap: 25px;
`;

const ProductBox = styled.div`
  ${BoxCommonStyles}
  margin: 0;
`;

const RightColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 35%;
  gap: 25px;
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
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: ${iconColor};
  }
`;

const Description = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  color: #666;
  margin: 15px 0;
  white-space: pre-line;
`;

const PriceWrapper = styled.div`
  ${BoxCommonStyles}
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  gap: 15px;
`;

const PriceLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

const Price = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${iconColor};
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 5px;
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? "#0066ff" : "#f0f5ff"};
  color: ${props => props.primary ? "white" : "#0066ff"};
  padding: 10px 15px;
  border: ${props => props.primary ? "none" : "1px solid #0066ff"};
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;

  &:hover {
    background-color: ${props => props.primary ? "#0052cc" : "#e6f0ff"};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ProductTitleWrapper = styled.div`
  margin-bottom: 20px;
`;

const ProductTitle = styled(Title)`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 5px;
`;

const ProductMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 5px;
  flex-wrap: wrap;
`;

const MetaBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #f0f5ff;
  color: #0066ff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const SpecificationsBox = styled.div`
  ${BoxCommonStyles}
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SpecificationsHeader = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: ${iconColor};
  }
`;

const SpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
`;

const SpecLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
`;

const SpecValue = styled.div`
  font-weight: 600;
  color: #333;
`;

const iconMap = {
  Transmission: <FaCogs style={{ color: iconColor }} />,
  Fuel: <FaGasPump style={{ color: iconColor }} />,
  Miles: <FaRoad style={{ color: iconColor }} />,
  Color: <FaTint style={{ color: iconColor }} />,
  Door: <FaBuilding style={{ color: iconColor }} />,
  Cylinder: <FaCube style={{ color: iconColor }} />,
  Year: <FaCalendarAlt style={{ color: iconColor }} />,
  Model: <FaCar style={{ color: iconColor }} />,
  Condition: <FaLeaf style={{ color: iconColor }} />,
  EngineSize: <FaCarBattery style={{ color: iconColor }} />,
};

export default function ProductPage({ product }) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const selectedProperties = [
    "Transmission", "Fuel", "Miles", "Color", "Door", "Cylinder", "EngineSize", "Year", "Model", "Condition"
  ];

  const properties = product.properties && product.properties[0] ? product.properties[0] : {};
  
  // Extract key properties for display with title
  const year = properties.Year || '';
  const condition = properties.Condition || '';
  const model = properties.Model || '';

  return (
    <>
      <Header />
      <Center>
        <ProductTitleWrapper>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductMeta>
            {year && (
              <MetaBadge>
                <FaCalendarAlt />
                {year}
              </MetaBadge>
            )}
            {condition && (
              <MetaBadge>
                <FaLeaf />
                {condition}
              </MetaBadge>
            )}
            {model && (
              <MetaBadge>
                <FaCar />
                {model}
              </MetaBadge>
            )}
          </ProductMeta>
        </ProductTitleWrapper>
        
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

          <RightColumnWrapper>
            <ProductInfoWrapper>
              <PriceWrapper>
                <PriceLabel>Our Price:</PriceLabel>
                <Price>${Number(product.price).toLocaleString()}</Price>
                <ButtonsContainer>
                  <ActionButton primary onClick={() => setShowBookingModal(true)}>
                    <CartIcon />
                    Rent Now
                  </ActionButton>
                  <Link href="/chat" passHref style={{ flex: 1 }}>
                    <ActionButton as="a">
                      <FaComments />
                      Chat
                    </ActionButton>
                  </Link>
                </ButtonsContainer>
              </PriceWrapper>
            </ProductInfoWrapper>

            <SpecificationsBox>
              <SpecificationsHeader>Specifications</SpecificationsHeader>
              {Object.entries(properties)
                .filter(([key]) => selectedProperties.includes(key))
                .map(([key, value]) => (
                  <SpecRow key={key}>
                    <SpecLabel>
                      {iconMap[key]}
                      <span>{key}</span>
                    </SpecLabel>
                    <SpecValue>{value}</SpecValue>
                  </SpecRow>
              ))}
            </SpecificationsBox>
          </RightColumnWrapper>
        </ColWrapper>
      </Center>
      <BookingModal 
        show={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        productId={product._id}
        productName={product.title}
        price={product.price}
      />
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