import styled from "styled-components";

const StyledDiv = styled.div`
  max-width: 1400px;  /* Adjusted for a more spacious layout */
  margin: 0 auto;
  padding: 0 5rem; /* Equivalent to Tailwind's px-20 */
`;

export default function Center({children}) {
  return (
    <StyledDiv>{children}</StyledDiv>
  );
}
