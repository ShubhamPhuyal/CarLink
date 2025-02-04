import { useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa"; // For mobile menu

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
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
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
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #1f2937;
  }
`;

const LoginMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* Space between login and menu */
`;

const LoginButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #f3f4f6;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem; /* Adjust padding to fit on smaller screens */
  }
`;

const MobileMenuIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  @media (min-width: 769px) {
    display: none; /* Hide on larger screens */
  }
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Background>
      <StyledNav>
        <Container>
          <NavWrapper>
            {/* Logo */}
            <LogoContainer>
              <img src="/carlink.png" alt="CarLink Logo" />
            </LogoContainer>

            {/* Navigation Links */}
            <NavLinks isOpen={menuOpen}>
              <NavLink href="/new-car">Book Cars</NavLink>
              <NavLink href="/rent-car">Car Parts</NavLink>
              <NavLink href="/car-parts">Rent Cars</NavLink>
              <NavLink href="/car-review">News</NavLink>
              <NavLink href="/compare-car">Compare Car</NavLink>
              <NavLink href="/chat">Cart (0)</NavLink>
            </NavLinks>

            {/* Login & Mobile Menu */}
            <LoginMenuWrapper>
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
