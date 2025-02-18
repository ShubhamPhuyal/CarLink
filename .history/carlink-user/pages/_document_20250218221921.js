import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Load Google Fonts here for better performance */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;750&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
