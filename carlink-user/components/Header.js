import { useContext, useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import styled from "styled-components";
import { FaBars, FaTimes, FaComments, FaUserCircle, FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartContext } from "./CartContext";
import axios from "axios";
import NotificationComponent from "./NotificationComponent";

// Styled Components
const Background = styled.div`
  background-color: #fbfbff;
`;

const StyledNav = styled.nav`
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
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
  color: ${({ isActive }) => (isActive ? "#0066cc" : "#374151")};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  background-color: ${({ isActive }) => (isActive ? "rgba(0, 102, 204, 0.1)" : "transparent")};

  &:hover {
    color: #0066cc;
    background-color: rgba(0, 102, 204, 0.05);
  }
`;

// Animated cart link with keyframes animation
const CartLink = styled(NavLink)`
  position: relative;
  animation: ${({ isAnimating }) => isAnimating ? 'cartPulse 0.6s ease-in-out' : 'none'};
  
  @keyframes cartPulse {
    0% {
      transform: scale(1);
      background-color: rgba(0, 102, 204, 0);
    }
    50% {
      transform: scale(1.1);
      background-color: rgba(0, 102, 204, 0.2);
      color: #0066cc;
    }
    100% {
      transform: scale(1);
      background-color: rgba(0, 102, 204, 0);
    }
  }
`;

const ChatIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0066cc;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 102, 204, 0.05);
    transform: scale(1.1);
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
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const DefaultProfileIcon = styled(FaUserCircle)`
  width: 36px;
  height: 36px;
  color: #374151;
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

const UserSection = styled.div`
  position: relative;
`;

const UserProfileButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const Username = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 200px;
  overflow: hidden;
`;

const DropdownItem = styled.a`
  display: flex;
  align-items: center;
  padding: 0.85rem 1.25rem;
  color: #374151;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  gap: 0.75rem;
  
  &:hover {
    background-color: #f3f4f6;
    color: #0066cc;
  }

  &:first-child {
    border-bottom: 1px solid #f1f1f1;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  transition: color 0.2s ease;
  
  ${DropdownItem}:hover & {
    color: #0066cc;
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  font-size: 12px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ChatIconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

// Header Component
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartProducts } = useContext(CartContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [animateCart, setAnimateCart] = useState(false);
  const prevCartLength = useRef(cartProducts.length);

  // Check if current route matches a path or its subpaths
  const isActivePath = (path) => {
    const currentPath = router.pathname;
    // Check if current path equals the given path or starts with path/
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".user-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Fetch unread messages count
  useEffect(() => {
    if (!session) return;

    const fetchUnreadMessages = async () => {
      try {
        const response = await axios.get("/api/chat/unreadCount", {
          params: {
            userId: session.user.id,
          },
        });
        setUnreadCount(response.data.count);
      } catch (error) {
        console.error("Error fetching unread messages:", error);
      }
    };

    fetchUnreadMessages();
    const interval = setInterval(fetchUnreadMessages, 10000);
    return () => clearInterval(interval);
  }, [session]);

  // Animation effect when cart items change
  useEffect(() => {
    if (cartProducts.length > prevCartLength.current) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 600);
      return () => clearTimeout(timer);
    }
    prevCartLength.current = cartProducts.length;
  }, [cartProducts.length]);

  if (status === "loading") {
    return null;
  }

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
              <Link href="/products" passHref legacyBehavior>
                <NavLink isActive={isActivePath("/products")}>Book Cars</NavLink>
              </Link>
              <Link href="/parts" passHref legacyBehavior>
                <NavLink isActive={isActivePath("/parts")}>Car Parts</NavLink>
              </Link>
              <Link href="/rent" passHref legacyBehavior>
                <NavLink isActive={isActivePath("/rent")}>Rent Cars</NavLink>
              </Link>
              <Link href="/news" passHref legacyBehavior>
                <NavLink isActive={isActivePath("/news")}>News</NavLink>
              </Link>
              <Link href="/comparecar" passHref legacyBehavior>
                <NavLink isActive={isActivePath("/comparecar")}>Compare Car</NavLink>
              </Link>
              <Link href="/cart" passHref legacyBehavior>
                <CartLink isAnimating={animateCart} isActive={isActivePath("/cart")}>
                  Cart ({cartProducts.length})
                </CartLink>
              </Link>
            </NavLinks>

            <LoginMenuWrapper>
              {/* Icons Container for Notification and Chat */}
              <IconsContainer>
                {/* Import the standalone NotificationComponent */}
                <NotificationComponent />
                
                {/* Chat Icon */}
                <ChatIconWrapper>
                  <Link href="/chat" passHref legacyBehavior>
                    <ChatIconLink title="Chat Support">
                      <FaComments size={24} />
                    </ChatIconLink>
                  </Link>
                  {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
                </ChatIconWrapper>
              </IconsContainer>

              {session?.user ? (
                <UserSection className="user-dropdown">
                  <UserProfileButton onClick={() => setDropdownOpen(!dropdownOpen)}>
                    {session.user.image ? (
                      <ProfileImage src={session.user.image} alt="User Avatar" />
                    ) : (
                      <DefaultProfileIcon />
                    )}
                    <Username>{session.user.name}</Username>
                    <FaChevronDown size={14} color="#6B7280" />
                  </UserProfileButton>
                  
                  {dropdownOpen && (
                    <DropdownMenu>
                      <Link href="/profile" passHref legacyBehavior>
                        <DropdownItem>
                          <IconWrapper>
                            <FaUser size={16} />
                          </IconWrapper>
                          View Profile
                        </DropdownItem>
                      </Link>
                      <DropdownItem onClick={() => signOut({ 
                        callbackUrl: process.env.NEXTAUTH_URL || "http://localhost:3001" 
                      })}>
                        <IconWrapper>
                          <FaSignOutAlt size={16} />
                        </IconWrapper>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  )}
                </UserSection>
              ) : (
                <LoginButton onClick={() => router.push("/login")}>Login</LoginButton>
              )}

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