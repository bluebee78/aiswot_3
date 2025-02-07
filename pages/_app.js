// pages/_app.js - Custom App component that wraps all pages in the application
import '../styles/globals.css'; // Import global CSS styles

// The MyApp component receives the page Component and its props
function MyApp({ Component, pageProps }) {
  // Render the current page component with its props
  return <Component {...pageProps} />;
}

export default MyApp; // Export MyApp as the default export so Next.js can use it
