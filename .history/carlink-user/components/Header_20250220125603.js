import { useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Background = styled.div`
  background-color: #fbfbff;
`;

const StyledNav = styled.nav`
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: auto;
  padding: 0 2rem;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  
  img {
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: bold;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 4rem;
    right: 0;
    background: white;
    width: 100%;
    padding: 1rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled.a`
  color: #374151;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: #0066cc;
    transition: all 0.3s ease;
  }

  &:hover {
    color: #0066cc;
    background-color: rgba(0, 102, 204, 0.05);
    
    &:after {
      width: 80%;
      left: 10%;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 1rem;
    
    &:hover {
      background-color: #f3f4f6;
    }
  }
`;

const LoginMenuWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 1rem;
`;

const LoginButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #f3f4f6;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const MobileMenuIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 102, 204, 0.05);
    transform: scale(1.1);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Background>
      <StyledNav>
        <Container>
          <NavWrapper>
            <LogoContainer>
              <Link href="/" passHref>
                <img src="/carlink.png" alt="CarLink Logo" />
              </Link>
            </LogoContainer>

            <NavLinks isOpen={menuOpen}>
              <NavLink href="/products">Book Cars</NavLink>
              <NavLink href="/parts">Car Parts</NavLink>
              <NavLink href="/car-parts">Rent Cars</NavLink>
              <NavLink href="/news">News</NavLink>
              <NavLink href="/compare-car">Compare Car</NavLink>
            </NavLinks>

            <LoginMenuWrapper>
              <Link href="/cart" passHref>
                <NavLink>Cart (0)</NavLink>
              </Link>
              <LoginButton>Login</LoginButton>
              <MobileMenuIcon onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </MobileMenuIcon>
            </LoginMenuWrapper>
          </NavWrapper>
        </Container>
      </StyledNav>
    </Background>
  );
}
