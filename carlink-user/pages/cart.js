import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"; // Just import useSession, not signIn

const PageContainer = styled.div`
  background-color: #f9fafb;
  margin-top: 9rem;
  min-height: 100vh;
  padding-bottom: 60px;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 30px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
`;

const CartBox = styled(Box)`
  overflow: hidden;
  
  h2 {
    font-size: 1.6rem;
    margin-bottom: 25px;
    color: #1e293b;
    font-weight: 600;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      height: 3px;
      width: 50px;
      background: #3b82f6;
      border-radius: 3px;
    }
  }
  
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    color: #64748b;
    font-size: 1.1rem;
  }
`;

const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  
  th {
    text-align: left;
    padding: 15px 10px;
    border-bottom: 2px solid #e2e8f0;
    color: #64748b;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  tbody tr {
    border-bottom: 1px solid #f1f5f9;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #f8fafc;
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  td {
    padding: 15px 10px;
  }
`;

const ProductInfoCell = styled.td`
  padding: 15px 10px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 500;
  color: #1e293b;
`;

const ProductImageBox = styled.div`
  width: 80px;
  height: 80px;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  img {
    max-width: 60px;
    max-height: 60px;
    object-fit: contain;
  }

  @media screen and (min-width: 768px) {
    width: 90px;
    height: 90px;
    img {
      max-width: 70px;
      max-height: 70px;
    }
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuantityButton = styled.button`
  background-color: ${props => props.primary ? '#3b82f6' : '#e2e8f0'};
  color: ${props => props.primary ? 'white' : '#475569'};
  border: none;
  padding: 8px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: ${props => props.primary ? '#2563eb' : '#cbd5e1'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const QuantityDisplay = styled.span`
  min-width: 30px;
  text-align: center;
  font-weight: 600;
  color: #1e293b;
`;

const PriceCell = styled.td`
  font-weight: 600;
  color: #1e293b;
  font-size: 1.05rem;
`;

const TotalRow = styled.tr`
  background-color: #f8fafc;
  
  td {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  
  strong {
    font-size: 1.2rem;
    color: #1e293b;
  }
`;

const OrderBox = styled(Box)`
  position: relative;
  border-top: 4px solid #3b82f6;
  
  h2 {
    font-size: 1.6rem;
    margin-bottom: 25px;
    color: #1e293b;
    font-weight: 600;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      height: 3px;
      width: 50px;
      background: #3b82f6;
      border-radius: 3px;
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 5px;
  border: 1px solid ${props => props.error ? '#ef4444' : '#e2e8f0'};
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 1rem;
  width: 100%;
  transition: all 0.2s;
  
  &:focus {
    border-color: ${props => props.error ? '#ef4444' : '#3b82f6'};
    box-shadow: 0 0 0 3px ${props => props.error ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'};
    outline: none;
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const InputError = styled.div`
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 4px;
  padding-left: 4px;
`;

const CityHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const SuccessBox = styled(Box)`
  text-align: center;
  padding: 40px;
  
  h1 {
    font-size: 2rem;
    color: #1e293b;
    margin-bottom: 16px;
  }
  
  p {
    color: #64748b;
    margin-bottom: 30px;
    font-size: 1.1rem;
  }
`;

const PaymentButton = styled(QuantityButton)`
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  font-size: 1.1rem;
  background-color: #3b82f6;
  color: white;
  
  &:hover {
    background-color: #2563eb;
  }
  
  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
    transform: none;
  }
`;

const FormErrorMessage = styled.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  border-left: 4px solid #ef4444;
  font-size: 0.9rem;
`;

const UserEmailDisplay = styled.div`
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LoginPrompt = styled.div`
  background-color: #e0f2fe;
  border-left: 4px solid #0ea5e9;
  color: #0c4a6e;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 0.95rem;
`;

export default function CartPage() {
  const router = useRouter();
  const { success } = router.query;
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Add session data
  const { data: session } = useSession();
  
  // Form validation state
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    city: false,
    postalCode: false,
    streetAddress: false,
    country: false
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    city: '',
    postalCode: '',
    streetAddress: '',
    country: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Auto-fill user data from session
  useEffect(() => {
    if (session?.user) {
      if (session.user.name) {
        setName(session.user.name);
      }
      if (session.user.email) {
        setEmail(session.user.email);
      }
    }
  }, [session]);

  useEffect(() => {
    if (success === "1") {
      setIsSuccess(true);
    }
  }, [success]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  // Validate form fields
  useEffect(() => {
    const validateForm = () => {
      const newErrors = {
        name: !name ? 'Name is required' : '',
        email: !email ? 'Email is required' : !validateEmail(email) ? 'Please enter a valid email' : '',
        city: !city ? 'City is required' : '',
        postalCode: !postalCode ? 'Postal code is required' : '',
        streetAddress: !streetAddress ? 'Street address is required' : '',
        country: !country ? 'Country is required' : ''
      };
      
      setErrors(newErrors);
    };
    
    validateForm();
  }, [name, email, city, postalCode, streetAddress, country]);
  
  // Email validation helper
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
  // Handle input blur to mark field as touched
  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  async function goToPayment() {
    // Check if user is logged in
    if (!session) {
      // Redirect to login page
      router.push('/login');
      return;
    }
    
    // Mark all fields as touched to show validation errors
    setTouched({
      name: true,
      email: true,
      city: true,
      postalCode: true,
      streetAddress: true,
      country: true
    });
    
    setFormSubmitted(true);
    
    // Check if any errors exist
    const hasErrors = Object.values(errors).some(error => error !== '');
    
    if (hasErrors) {
      setFormError('Please fill out all required fields correctly.');
      // Scroll to the top of the form to see the error message
      window.scrollTo({ top: document.querySelector('form').offsetTop - 100, behavior: 'smooth' });
      return;
    }
    
    try {
      setFormError('');
      const response = await axios.post("/api/checkout", {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
        userId: session.user.id, // Pass the userId from session
      });
      
      if (response.data.url) {
        window.location = response.data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      setFormError('An error occurred while processing your payment. Please try again.');
    }
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  // Handle redirect to login page
  const redirectToLogin = () => {
    router.push('/login');
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <PageContainer>
        <Header />
        <Center>
          <SuccessBox>
            <h1>Thanks for your order!</h1>
            <p>We will email you when your order is shipped.</p>
            <QuantityButton
              primary
              onClick={() => {
                router.push("/cart").then(() => router.reload());
              }}
            >
              Go Back to Cart
            </QuantityButton>
          </SuccessBox>
        </Center>
      </PageContainer>
    );
  }

  // Check if all inputs are valid
  const isFormValid = 
    name !== '' && 
    email !== '' && 
    validateEmail(email) && 
    city !== '' && 
    postalCode !== '' && 
    streetAddress !== '' && 
    country !== '';

  return (
    <PageContainer>
      <Header />
      <Center>
        <ColumnsWrapper>
          <CartBox>
            <h2>Your Shopping Cart</h2>
            {!cartProducts?.length && (
              <div className="empty-cart">Your cart is empty</div>
            )}
            {products?.length > 0 && (
              <StyledTable>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          {product.images && product.images[0] ? (
                            <img
                              src={`http://localhost:3000${product.images[0]}`}
                              alt={product.title}
                            />
                          ) : (
                            <p>No image</p>
                          )}
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <QuantityControl>
                          <QuantityButton onClick={() => lessOfThisProduct(product._id)}>
                            -
                          </QuantityButton>
                          <QuantityDisplay>
                            {cartProducts.filter((id) => id === product._id).length}
                          </QuantityDisplay>
                          <QuantityButton onClick={() => moreOfThisProduct(product._id)}>
                            +
                          </QuantityButton>
                        </QuantityControl>
                      </td>
                      <PriceCell>
                        ${cartProducts.filter((id) => id === product._id).length *
                          product.price}
                      </PriceCell>
                    </tr>
                  ))}
                  <TotalRow>
                    <td colSpan="2" style={{ textAlign: "right" }}>
                      Total:
                    </td>
                    <PriceCell>
                      <strong>${total}</strong>
                    </PriceCell>
                  </TotalRow>
                </tbody>
              </StyledTable>
            )}
          </CartBox>
          {!!cartProducts?.length && (
            <OrderBox>
              <h2>Order Information</h2>
              
              {!session ? (
                <LoginPrompt>
                  You need to be signed in to make a purchase.
                </LoginPrompt>
              ) : (
                <UserEmailDisplay>
                  Ordering as: {session.user.email}
                </UserEmailDisplay>
              )}
              
              <form onSubmit={(e) => e.preventDefault()}>
                {formSubmitted && formError && (
                  <FormErrorMessage>{formError}</FormErrorMessage>
                )}
                
                <InputWrapper>
                  <StyledInput
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    onBlur={() => handleBlur('name')}
                    error={touched.name && errors.name}
                  />
                  {touched.name && errors.name && (
                    <InputError>{errors.name}</InputError>
                  )}
                </InputWrapper>
                
                <InputWrapper>
                  <StyledInput
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    onBlur={() => handleBlur('email')}
                    error={touched.email && errors.email}
                    disabled={!!session} // Disable email input if user is logged in
                  />
                  {touched.email && errors.email && (
                    <InputError>{errors.email}</InputError>
                  )}
                </InputWrapper>
                
                <CityHolder>
                  <InputWrapper>
                    <StyledInput
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(ev) => setCity(ev.target.value)}
                      onBlur={() => handleBlur('city')}
                      error={touched.city && errors.city}
                    />
                    {touched.city && errors.city && (
                      <InputError>{errors.city}</InputError>
                    )}
                  </InputWrapper>
                  
                  <InputWrapper>
                    <StyledInput
                      type="text"
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(ev) => setPostalCode(ev.target.value)}
                      onBlur={() => handleBlur('postalCode')}
                      error={touched.postalCode && errors.postalCode}
                    />
                    {touched.postalCode && errors.postalCode && (
                      <InputError>{errors.postalCode}</InputError>
                    )}
                  </InputWrapper>
                </CityHolder>
                
                <InputWrapper>
                  <StyledInput
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    onChange={(ev) => setStreetAddress(ev.target.value)}
                    onBlur={() => handleBlur('streetAddress')}
                    error={touched.streetAddress && errors.streetAddress}
                  />
                  {touched.streetAddress && errors.streetAddress && (
                    <InputError>{errors.streetAddress}</InputError>
                  )}
                </InputWrapper>
                
                <InputWrapper>
                  <StyledInput
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(ev) => setCountry(ev.target.value)}
                    onBlur={() => handleBlur('country')}
                    error={touched.country && errors.country}
                  />
                  {touched.country && errors.country && (
                    <InputError>{errors.country}</InputError>
                  )}
                </InputWrapper>
                
                <PaymentButton 
                  primary 
                  onClick={!session ? redirectToLogin : goToPayment} // Redirect to login if not signed in
                  disabled={(formSubmitted && !isFormValid) && session}
                >
                  {!session ? 'Sign In To Continue' : 'Continue to Payment'}
                </PaymentButton>
              </form>
            </OrderBox>
          )}
        </ColumnsWrapper>
      </Center>
    </PageContainer>
  );
}