import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Title from "@/components/Title";
import { Category } from "@/models/Category"; // Adjust the path if needed


// Modern styled components
const CompareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 2px;
    background-color: #333;
  }
`;

const CarsCompareGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CarCompareCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
`;

const CarPlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 80px;
    height: 80px;
    fill: #d1d1d1;
    margin-bottom: 10px;
  }
`;

const CarImage = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const SelectCarText = styled.div`
  color: #888;
  font-size: 16px;
  text-align: center;
`;

const SelectWrapper = styled.div`
  width: 270px;
  padding: 15px;
  border-top: 1px solid #e2e8f0;
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 30px 10px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 14px;
  color: #555;
  background-color: white;
  cursor: pointer;
  
  /* Remove default select styling */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const SelectArrow = styled.div`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #555;
  pointer-events: none;
`;

const CompareButton = styled.button`
  padding: 12px 30px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin: 20px auto;
  display: block;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background-color: #f3f4f6;
  color: #111827;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid #e5e7eb;
`;

const TableData = styled.td`
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  color: #374151;
`;

// Car icon SVG component
const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"/>
  </svg>
);

export default function CompareCarPage({ products }) {
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);
  const [car3, setCar3] = useState(null);
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      <Header />
      <Center>
        <CompareContainer>
          <Title>COMPARE CARS</Title>
          
          <CarsCompareGrid>
            {/* Car 1 */}
            <CarCompareCard>
              {car1 ? (
                <CarImage>
                  <img
                    src={car1?.images?.[0] ? `http://localhost:3000${car1.images[0]}` : "/grey-placeholder.jpg"}
                    alt={car1?.title || "Car 1"}
                  />
                </CarImage>
              ) : (
                <CarPlaceholder>
                  <CarIcon />
                  <SelectCarText>Select car</SelectCarText>
                </CarPlaceholder>
              )}
              
              <SelectWrapper>
                <Select onChange={(e) => setCar1(products.find(car => car._id === e.target.value))}>
                  <option value="">Select Brand/Model</option>
                  {products.map((car) => (
                    <option key={car._id} value={car._id}>
                      {car.title}
                    </option>
                  ))}
                </Select>
                <SelectArrow />
              </SelectWrapper>
            </CarCompareCard>
            
            {/* Car 2 */}
            <CarCompareCard>
              {car2 ? (
                <CarImage>
                  <img
                    src={car2?.images?.[0] ? `http://localhost:3000${car2.images[0]}` : "/grey-placeholder.jpg"}
                    alt={car2?.title || "Car 2"}
                  />
                </CarImage>
              ) : (
                <CarPlaceholder>
                  <CarIcon />
                  <SelectCarText>Select car</SelectCarText>
                </CarPlaceholder>
              )}
              
              <SelectWrapper>
                <Select onChange={(e) => setCar2(products.find(car => car._id === e.target.value))}>
                  <option value="">Select Brand/Model</option>
                  {products.map((car) => (
                    <option key={car._id} value={car._id}>
                      {car.title}
                    </option>
                  ))}
                </Select>
                <SelectArrow />
              </SelectWrapper>
            </CarCompareCard>
            
            {/* Car 3 */}
            <CarCompareCard>
              {car3 ? (
                <CarImage>
                  <img
                    src={car3?.images?.[0] ? `http://localhost:3000${car3.images[0]}` : "/grey-placeholder.jpg"}
                    alt={car3?.title || "Car 3"}
                  />
                </CarImage>
              ) : (
                <CarPlaceholder>
                  <CarIcon />
                  <SelectCarText>Select car</SelectCarText>
                </CarPlaceholder>
              )}
              
              <SelectWrapper>
                <Select onChange={(e) => setCar3(products.find(car => car._id === e.target.value))}>
                  <option value="">Select Brand/Model</option>
                  {products.map((car) => (
                    <option key={car._id} value={car._id}>
                      {car.title}
                    </option>
                  ))}
                </Select>
                <SelectArrow />
              </SelectWrapper>
            </CarCompareCard>
          </CarsCompareGrid>

          <CompareButton
            onClick={() => setShowTable(car1 !== null && car2 !== null)}
            disabled={!car1 || !car2}
          >
            Compare Now
          </CompareButton>

          {/* Comparison Table (Only visible when button is clicked) */}
          {showTable && (
            <Table>
              <thead>
                <tr>
                  <TableHeader>Feature</TableHeader>
                  <TableHeader>{car1?.title || "Car 1"}</TableHeader>
                  <TableHeader>{car2?.title || "Car 2"}</TableHeader>
                  {car3 && <TableHeader>{car3.title}</TableHeader>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableData>Price</TableData>
                  <TableData>${car1?.price?.toLocaleString() || "N/A"}</TableData>
                  <TableData>${car2?.price?.toLocaleString() || "N/A"}</TableData>
                  {car3 && <TableData>${car3?.price?.toLocaleString() || "N/A"}</TableData>}
                </tr>
                <tr>
                  <TableData>Fuel Type</TableData>
                  <TableData>{car1?.properties?.[0]?.Fuel || "N/A"}</TableData>
                  <TableData>{car2?.properties?.[0]?.Fuel || "N/A"}</TableData>
                  {car3 && <TableData>{car3?.properties?.[0]?.Fuel || "N/A"}</TableData>}
                </tr>
                <tr>
                  <TableData>Transmission</TableData>
                  <TableData>{car1?.properties?.[0]?.Transmission || "N/A"}</TableData>
                  <TableData>{car2?.properties?.[0]?.Transmission || "N/A"}</TableData>
                  {car3 && <TableData>{car3?.properties?.[0]?.Transmission || "N/A"}</TableData>}
                </tr>
                <tr>
                  <TableData>Engine Size</TableData>
                  <TableData>{car1?.properties?.[0]?.EngineSize || "N/A"}</TableData>
                  <TableData>{car2?.properties?.[0]?.EngineSize || "N/A"}</TableData>
                  {car3 && <TableData>{car3?.properties?.[0]?.EngineSize || "N/A"}</TableData>}
                </tr>
                <tr>
                  <TableData>Year</TableData>
                  <TableData>{car1?.properties?.[0]?.Year || "N/A"}</TableData>
                  <TableData>{car2?.properties?.[0]?.Year || "N/A"}</TableData>
                  {car3 && <TableData>{car3?.properties?.[0]?.Year || "N/A"}</TableData>}
                </tr>
                <tr>
                  <TableData>Miles</TableData>
                  <TableData>{car1?.properties?.[0]?.Miles?.toLocaleString() || "N/A"}</TableData>
                  <TableData>{car2?.properties?.[0]?.Miles?.toLocaleString() || "N/A"}</TableData>
                  {car3 && <TableData>{car3?.properties?.[0]?.Miles?.toLocaleString() || "N/A"}</TableData>}
                </tr>
                <tr>
                  <TableData>Color</TableData>
                  <TableData>{car1?.properties?.[0]?.Color || "N/A"}</TableData>
                  <TableData>{car2?.properties?.[0]?.Color || "N/A"}</TableData>
                  {car3 && <TableData>{car3?.properties?.[0]?.Color || "N/A"}</TableData>}
                </tr>
                <tr>
                  <TableData>Doors</TableData>
                  <TableData>{car1?.properties?.[0]?.Door || "N/A"}</TableData>
                  <TableData>{car2?.properties?.[0]?.Door || "N/A"}</TableData>
                  {car3 && <TableData>{car3?.properties?.[0]?.Door || "N/A"}</TableData>}
                </tr>
                <tr>
                  <TableData>Condition</TableData>
                  <TableData>{car1?.properties?.[0]?.Condition || "N/A"}</TableData>
                  <TableData>{car2?.properties?.[0]?.Condition || "N/A"}</TableData>
                  {car3 && <TableData>{car3?.properties?.[0]?.Condition || "N/A"}</TableData>}
                </tr>
              </tbody>
            </Table>
          )}
        </CompareContainer>
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  
  // Find category with name "Parts"
  const category = await Category.findOne({ name: 'Tesla' });
  
  if (!category) {
    return {
      props: {
        products: [],  // Return empty array if category "Parts" is not found
      },
    };
  }

  // Find products belonging to the "Parts" category
  const products = await Product.find({ category: category._id }, null, { sort: { '_id': -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
