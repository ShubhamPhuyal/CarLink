import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaBars, FaTimes, FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import Link from "next/link";

const slideDown = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Background = styled.div`
  background-color: #fbfbff;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
  transform: translateY(${({ hide }) => (hide ? '-100%' : '0')});
`;

const StyledNav = styled.nav`
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
  height: 5rem;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  
  img {
    height: 2.5rem;
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
  gap: 2rem;
  font-weight: 500;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 5rem;
    left: 0;
    background: white;
    width: 100%;
    padding: 1rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: ${slideDown} 0.3s ease-out;
  }
`;

const NavLink = styled.a`
  color: #374151;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
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

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #374151;

  &:hover {
    background-color: rgba(0, 102, 204, 0.1);
    color: #0066cc;
    transform: translateY(-2px);
  }
`;

const LoginButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 2px solid #0066cc;
  border-radius: 0.5rem;
  background: transparent;
  color: #0066cc;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0066cc;
    color: white;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  animation: ${slideDown} 0.3s ease-out;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ef4444;
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  font-weight: 600;
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Background hide={hideNav}>
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

            <ActionButtons>
              <IconButton onClick={() => setSearchOpen(!searchOpen)}>
                <FaSearch size={18} />
              </IconButton>
              
              <IconButton>
                <FaShoppingCart size={18} />
                <CartBadge>2</CartBadge>
              </IconButton>

              <LoginButton>
                <FaUser size={16} style={{ marginRight: '0.5rem' }} />
                Login
              </LoginButton>

              <IconButton onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </IconButton>
            </ActionButtons>
          </NavWrapper>

          <SearchContainer isVisible={searchOpen}>
            <SearchInput 
              placeholder="Search for cars, parts, or news..."
              autoFocus
            />
          </SearchContainer>
        </Container>
      </StyledNav>
    </Background>
  );
}