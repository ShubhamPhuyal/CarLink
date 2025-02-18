import styled from "styled-components";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterBackground = styled.div`
 
  padding: 4rem 0 0 0;
`;

const FooterWrapper = styled.footer`
  background-color: #1F2937;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: auto;
  padding: 0 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 3rem 0;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 568px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #F3F4F6;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLink = styled.a`
  color: #D1D5DB;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  font-size: 0.95rem;

  &:hover {
    color: #F9FAFB;
    text-decoration: underline;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #D1D5DB;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #F9FAFB;
    transform: translateY(-2px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 2rem 0;
  color: #9CA3AF;
  font-size: 0.9rem;
  border-top: 1px solid #374151;
`;

const NewsletterInput = styled.input`
  padding: 0.75rem;
  background-color: #374151;
  border: 1px solid #4B5563;
  border-radius: 0.375rem;
  width: 100%;
  margin-bottom: 1rem;
  color: #F9FAFB;
  transition: all 0.3s ease-in-out;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #60A5FA;
    background-color: #4B5563;
  }
`;

const SubscribeButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #2563EB;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function Footer() {
  return (
    <FooterBackground>
      <FooterWrapper>
        <Container>
          <FooterContent>
            <FooterSection>
              <h3>About CarLink</h3>
              <FooterLinks>
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
                <FooterLink href="/press">Press</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <h3>Services</h3>
              <FooterLinks>
                <FooterLink href="/car-rental">Car Rental</FooterLink>
                <FooterLink href="/car-sales">Car Sales</FooterLink>
                <FooterLink href="/car-parts">Car Parts</FooterLink>
                <FooterLink href="/car-maintenance">Car Maintenance</FooterLink>
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <h3>Support</h3>
              <FooterLinks>
                <FooterLink href="/contact">Contact Us</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <h3>Newsletter</h3>
              <NewsletterInput 
                type="email" 
                placeholder="Enter your email"
              />
              <SubscribeButton>Subscribe</SubscribeButton>
              <SocialLinks>
                <SocialIcon href="https://facebook.com" target="_blank">
                  <FaFacebook size={24} />
                </SocialIcon>
                <SocialIcon href="https://twitter.com" target="_blank">
                  <FaTwitter size={24} />
                </SocialIcon>
                <SocialIcon href="https://instagram.com" target="_blank">
                  <FaInstagram size={24} />
                </SocialIcon>
                <SocialIcon href="https://linkedin.com" target="_blank">
                  <FaLinkedin size={24} />
                </SocialIcon>
              </SocialLinks>
            </FooterSection>
          </FooterContent>

          <Copyright>
            © {new Date().getFullYear()} CarLink. All rights reserved.
          </Copyright>
        </Container>
      </FooterWrapper>
    </FooterBackground>
  );
}