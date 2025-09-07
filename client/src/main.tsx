import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Wrapper component with scroll handler for responsive navbar
const AppWithScrollHandler = () => {
  useEffect(() => {
    // Update body padding based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const body = document.body;
      
      if (scrollPosition > 20) {
        body.style.paddingTop = '70px';
      } else {
        body.style.paddingTop = '90px';
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set the correct padding
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AppWithScrollHandler />
  </QueryClientProvider>
);
