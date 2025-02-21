import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Background = styled.div`
  background-color: #fbfbff;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  animation: ${slideDown} 0.5s ease-out;
`;

const StyledNav = styled.nav`
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateY(${props => props.show ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
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
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 4rem;
    right: 0;
    background: white;
    width: 100%;
    padding: 1rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateX(${props => props.isOpen ? '0' : '100%'});
    opacity: ${props => props.isOpen ? '1' : '0'};
    transition: all 0.3s ease-in-out;
    pointer-events: ${props => props.isOpen ? 'all' : 'none'};
  }
`;

const NavLink = styled.a`
  color: #374151;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.index * 0.1}s;

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
    transform: translateY(-2px);
    
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
      transform: translateX(10px);
    }
  }
`;

const LoginMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: ${fadeIn} 0.5s ease-out;
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
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: rgba(0, 102, 204, 0.05);
    
    svg {
      transform: rotate(180deg);
    }
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const navItems = [
    { href: "/products", text: "Book Cars" },
    { href: "/parts", text: "Car Parts" },
    { href: "/car-parts", text: "Rent Cars" },
    { href: "/news", text: "News" },
    { href: "/compare-car", text: "Compare Car" },
    { href: "/cart", text: "Cart (0)" },
  ];

  return (
    <Background>
      <StyledNav show={visible}>
        <Container>
          <NavWrapper>
            <LogoContainer>
              <Link href="/" passHref>
                <img src="/carlink.png" alt="CarLink Logo" />
              </Link>
            </LogoContainer>

            <NavLinks isOpen={menuOpen}>
              {navItems.map((item, index) => (
                <NavLink key={item.href} href={item.href} index={index}>
                  {item.text}
                </NavLink>
              ))}
            </NavLinks>

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