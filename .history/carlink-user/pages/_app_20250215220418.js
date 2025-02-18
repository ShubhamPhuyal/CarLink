import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
  body {
   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700,750&display=swap');
    background-color: #FBFBFF;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
