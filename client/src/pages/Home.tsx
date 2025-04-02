import { useEffect } from "react";
import Hero from "@/components/home/Hero";
import WorldSection from "@/components/home/WorldSection";
import TribesSection from "@/components/home/TribesSection";
import CharactersSection from "@/components/home/CharactersSection";
import MapSection from "@/components/home/MapSection";
import GameSection from "@/components/home/GameSection";

const Home = () => {
  // Scroll to section if URL has hash
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        // Add a slight delay for DOM rendering
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div>
      <Hero />
      <WorldSection />
      <TribesSection />
      <CharactersSection />
      <MapSection />
      <GameSection />
    </div>
  );
};

export default Home;
