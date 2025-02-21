export default function ProductPage({ product }) {
    const publishedDate = new Date(product.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  
    return (
      <>
        <Header />
        <Center>
          <BlogContainer>
            <BlogTitle>{product.title}</BlogTitle>
            <PropertiesBox>
              <DatePublished>
                <FaCalendarAlt size={14} /> Published: {publishedDate}
              </DatePublished>
              {product.properties && product.properties[0]?.Type && (
                <Category>{product.properties[0].Type}</Category>
              )}
              {product.properties && product.properties[0]?.Brand && (
                <Category>{product.properties[0].Brand}</Category>
              )} 
            </PropertiesBox>
            {product.images?.length > 0 && (
              <ProductImage src={`http://localhost:3000${product.images[0]}`} alt="Product Image" />
            )}
            <DescriptionContainer>
              <Description>{product.description}</Description>
            </DescriptionContainer>
          </BlogContainer>
        </Center>
      </>
    );
  }
  