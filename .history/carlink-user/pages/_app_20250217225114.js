import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #FBFBFF;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;750&display=swap" rel="stylesheet" />
      </Helmet>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
