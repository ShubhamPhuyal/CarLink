import { useState, useContext, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { CartContext } from "./CartContext";

// Color palette
const colors = {
  primary: "#3182ce", // Blue
  secondary: "#805ad5", // Purple
  accent: "#38b2ac", // Teal
  success: "#48bb78", // Green
  warning: "#ed8936", // Orange
  error: "#e53e3e", // Red
  dark: "#2d3748", // Dark blue/gray
  gray: "#718096",
  lightGray: "#e2e8f0",
  background: "#f7fafc",
  white: "#ffffff",
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, ${colors.background} 0%, #edf2f7 100%);
  padding: 32px 20px;
`;

const Card = styled.div`
  background: ${colors.white};
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 420px;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    padding: 32px 24px;
    width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 16px;
  text-align: center;
  color: ${colors.dark};
  font-weight: 700;
`;

const SubTitle = styled.p`
  font-size: 16px;
  text-align: center;
  color: ${colors.gray};
  margin-bottom: 32px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
  color: ${colors.dark};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid ${colors.lightGray};
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${colors.secondary};
    box-shadow: 0 0 0 3px rgba(128, 90, 213, 0.2);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  
  &:hover {
    background: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: ${colors.secondary};
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  transition: color 0.2s;
  padding: 4px 8px;
  
  &:hover {
    color: ${colors.primary};
  }
`;

const ErrorMessage = styled.div`
  color: ${colors.error};
  font-size: 14px;
  margin: 16px 0 24px;
  padding: 12px 16px;
  background-color: #fff5f5;
  border-radius: 8px;
  border-left: 4px solid ${colors.error};
`;

const SuccessMessage = styled.div`
  color: ${colors.success};
  font-size: 14px;
  margin: 16px 0 24px;
  padding: 12px 16px;
  background-color: #f0fff4;
  border-radius: 8px;
  border-left: 4px solid ${colors.success};
`;

const FormDivider = styled.div`
  position: relative;
  margin: 30px 0;
  text-align: center;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${colors.lightGray};
  }
  
  span {
    position: relative;
    background-color: ${colors.white};
    padding: 0 16px;
    color: ${colors.gray};
    font-size: 14px;
  }
`;

const LogoutButton = styled(Button)`
  padding: 10px 20px;
  width: auto;
  font-size: 15px;
  background: linear-gradient(to right, ${colors.primary}, ${colors.accent});
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: ${colors.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
`;

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { clearCart, setUser } = useContext(CartContext);

  useEffect(() => {
    if (session && router.pathname === "/login") {
      router.push("/");
    }
  }, [session, router]);

  async function handleLogin(e) {
    e.preventDefault();
    setAuthError("");
    
    if (!email || !password) {
      setAuthError("Please enter both email and password");
      return;
    }
    
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/"
    });

    if (result?.error) {
      setAuthError(result.error);
    } else {
      router.push(result?.url || "/");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setAuthError("");
    setSuccessMessage("");
    
    if (!name || !email || !password) {
      setAuthError("Please fill in all fields");
      return;
    }
    
    if (password.length < 6) {
      setAuthError("Password should be at least 6 characters");
      return;
    }
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccessMessage("Registration successful! Please sign in with your new account.");
        setTimeout(() => {
          setIsRegistering(false);
          setEmail("");
          setPassword("");
          setName("");
          setSuccessMessage("");
        }, 2000);
      } else {
        throw new Error(data.error || "Registration failed");
      }
    } catch (error) {
      setAuthError(error.message);
    }
  }

  async function handleLogout() {
    try {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("cart");
      clearCart();
      setUser(null);
      await signOut({ callbackUrl: "/index" });
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  }

  if (status === "loading") {
    return (
      <Container>
        <Card>
          <div style={{ textAlign: "center" }}>
            <Title>Loading</Title>
            <div style={{ margin: "24px 0" }}>
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="none" stroke={colors.secondary} strokeWidth="4" strokeDasharray="56.5 56.5" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
                  <style>{`
                    @keyframes spin { 
                      0% { transform: rotate(0deg); } 
                      100% { transform: rotate(360deg); } 
                    }
                  `}</style>
                </circle>
              </svg>
            </div>
            <p style={{ color: colors.gray }}>Please wait while we set things up...</p>
          </div>
        </Card>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container>
        <Card>
          <Title>{isRegistering ? "Create Account" : "Welcome Back"}</Title>
          <SubTitle>
            {isRegistering 
              ? "Fill in the details to create your account" 
              : "Sign in to continue to your dashboard"}
          </SubTitle>
          
          {authError && <ErrorMessage>{authError}</ErrorMessage>}
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            {isRegistering && (
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormGroup>
            )}
            
            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={isRegistering ? "Create a password (min. 6 characters)" : "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={isRegistering ? 6 : undefined}
              />
              {isRegistering && (
                <div style={{ fontSize: "13px", color: colors.gray, marginTop: "6px" }}>
                  Password must be at least 6 characters long
                </div>
              )}
            </FormGroup>
            
            <Button type="submit">
              {isRegistering ? "Create Account" : "Sign In"}
            </Button>
          </form>
          
          <FormDivider>
            <span>OR</span>
          </FormDivider>
          
          <div style={{ textAlign: "center" }}>
            {isRegistering ? (
              <>
                Already have an account?{" "}
                <LinkButton
                  onClick={() => {
                    setIsRegistering(false);
                    setAuthError("");
                    setSuccessMessage("");
                  }}
                >
                  Sign in
                </LinkButton>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <LinkButton
                  onClick={() => {
                    setIsRegistering(true);
                    setAuthError("");
                    setSuccessMessage("");
                  }}
                >
                  Register
                </LinkButton>
              </>
            )}
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <>
      <Header>
        <div style={{ fontWeight: "600", fontSize: "18px", color: colors.dark }}>
          My Application
        </div>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      {children}
    </>
  );
}