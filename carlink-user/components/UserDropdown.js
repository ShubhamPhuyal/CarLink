import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 150px;
`;

const DropdownItem = styled.a`
  display: block;
  padding: 0.75rem 1rem;
  color: #374151;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const UserDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <DropdownContainer>
      <ProfileImage
        src={user.image}
        alt="User Avatar"
        onClick={toggleDropdown}
      />
      {isOpen && (
        <DropdownMenu>
          <Link href="/profile" passHref>
            <DropdownItem>View Profile</DropdownItem>
          </Link>
          <DropdownItem onClick={() => signOut({ callbackUrl: "/login" })}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default UserDropdown;