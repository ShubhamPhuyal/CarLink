import styled, {css} from "styled-components";

export const ButtonStyle = css`
  background-color: #3361E0;  
    color: #fff;
    border-radius: 24px;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    text-decoration: none;

    @media (max-width: 768px) { /* Mobile */
      width: 100%;
    }
`;
// Define button styles
const StyledButton = styled.button`
  ${ButtonStyle}

  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      background-color: gray;
    `}
`;

export default function Button({ children, variant }) {
  return <StyledButton $variant={variant}>{children}</StyledButton>;
}
