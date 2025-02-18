import { createGlobalStyle } from "styled-components";
import Head from "next/head";
import ProgressBar from "@/components/ProgressBar"; // Import ProgressBar
import "nprogress/nprogress.css"; // Import styles for the progress bar

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #FBFBFF;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

  /* Custom NProgress styles */
  #nprogress .bar {
    background: #0066cc !important;
    height: 3px !important;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;750&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      <ProgressBar /> {/* Add ProgressBar Component */}
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
