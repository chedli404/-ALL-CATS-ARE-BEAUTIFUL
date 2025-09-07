import { useEffect } from "react";
import MapSection from "@/components/home/MapSection";
import GameSection from "@/components/home/GameSection";
import Zied from "@/components/home/Zied";
import Organisation from "@/components/home/Organisation";
import Kabila from "@/components/home/Kabila";
import Introduction from "@/components/home/Introduction";
import Chronologie from "@/components/home/Chronologie";

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
    <div className="bg-background-dark min-h-screen">
      {/* Original layout restored */}
      <Introduction />
      <Chronologie />
      <Kabila />
      <Zied />
      <Organisation />
      <MapSection />
      <GameSection />
    </div>
  );
};

export default Home;
