export default function ProductPage({ product }) {
  const selectedProperties = [
    "Transmission", "Fuel", "Miles", "Color", "Door", "Cylinder", "EngineSize", "Year", "Model", "Condition"
  ];

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

          <RightColumnWrapper>
            <ProductInfoWrapper>
              <PriceWrapper>
                <PriceLabel>Our Price:</PriceLabel>
                <Price>${product.price}</Price>
                <AddToCartButton>
                  <CartIcon />
                  Add to cart
                </AddToCartButton>
              </PriceWrapper>
            </ProductInfoWrapper>

            <SpecificationsBox>
              <SpecificationsHeader>Specifications</SpecificationsHeader>
              {Object.entries(properties)
                .filter(([key]) => selectedProperties.includes(key)) // Filter based on selectedProperties
                .map(([key, value]) => (
                  <SpecRow key={key}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {iconMap[key]}
                      <span style={{ marginLeft: '8px' }}>{key}</span>
                    </div>
                    <span>{value}</span>
                  </SpecRow>
              ))}
            </SpecificationsBox>
          </RightColumnWrapper>
        </ColWrapper>
      </Center>
    </>
  );
}
