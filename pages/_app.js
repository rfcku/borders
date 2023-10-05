import '../styles/globals.css';

import { NextUIProvider } from '@nextui-org/react';
// import { createTheme } from '@nextui-org';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

// const lightTheme = createTheme({
//   type: 'light',
//   theme: {
//     // colors: {...}, // optional
//   },
// });

// const darkTheme = createTheme({
//   type: 'dark',
//   theme: {
//     // colors: {...}, // optional
//   },
// });

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <NextThemesProvider defaultTheme='system' attribute='class'>
        <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default MyApp;
