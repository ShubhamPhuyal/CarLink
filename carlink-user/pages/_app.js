import { CartContextProvider } from "@/components/CartContext";
import { SessionProvider } from "next-auth/react";
import { createGlobalStyle } from "styled-components";
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #FBFBFF;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }`



export default function App({ Component, pageProps }) {
  useEffect(() => {
    fetch('/api/socket');
  }, []);

  return (
    <>
      <GlobalStyles />
      <SessionProvider session={pageProps.session}>
        <CartContextProvider>
          <Component {...pageProps} />
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
          />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}