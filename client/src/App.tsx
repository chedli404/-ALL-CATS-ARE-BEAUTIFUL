import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster.tsx";
import Navbar from "@/components/layout/Navbar.tsx";
import Footer from "@/components/layout/Footer.tsx";
import { EditModeProvider } from "@/contexts/EditModeContext";
import EditModeToggle from "@/components/admin/EditModeToggle";
import AuthGuard from "@/components/auth/AuthGuard";
import Home from "@/pages/Home.tsx";
import Map from "@/pages/Map.tsx";
import Game from "@/pages/Game.tsx";
import Tribes from "@/pages/Tribes.tsx";
import Legends from "@/pages/Legends.tsx";
import Artifacts from "@/pages/Artifacts.tsx";
import NotFound from "@/pages/not-found.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage";
import AdminPage from "@/pages/AdminPage.tsx";
import World from "@/pages/world.tsx";
import VerifyEmailPage from "@/pages/VerifyEmailPage";
import Ecologie from "@/pages/Ecologie.tsx";
import Histoire from "@/pages/Histoire.tsx";
import Humanite from "@/pages/Humanite.tsx";
import Economie from "@/pages/Economie.tsx";
import Politique from "@/pages/Politique.tsx";
import Characters from "./pages/Characters";
import { CharacterDetail } from "./pages/CharacterDetail";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Vote from "./pages/Vote";

// Kabila background particles component
const BackgroundParticles = () => {
  const particles = [];
  const tribes = ["#1C6E5F", "#E3A947", "#C73E3A", "#9C4DC4", "#39C9C9"];

  // Create 15 particles with different properties
  for (let i = 0; i < 15; i++) {
    const size = Math.floor(Math.random() * 20) + 10;
    const color = tribes[Math.floor(Math.random() * tribes.length)];
    const left = `${Math.floor(Math.random() * 100)}%`;
    const top = `${Math.floor(Math.random() * 100)}%`;
    const delay = `${Math.random() * 5}s`;
    const duration = `${Math.random() * 10 + 10}s`;

    particles.push(
      <div
        key={i}
        className="absolute rounded-full opacity-10 pointer-events-none"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          left,
          top,
          animation: `float ${duration} infinite ease-in-out`,
          animationDelay: delay,
          zIndex: 0
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      {particles}
    </div>
  );
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      className="w-full flex-grow"
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [location] = useLocation();

  const isAuthPage = ['/login', '/register'].includes(location) || location.startsWith('/verify');

  return (
    <EditModeProvider>
      <AuthGuard>
        <div className="flex flex-col min-h-screen w-full max-w-[100vw] overflow-x-hidden relative bg-background-dark">
          {!isAuthPage && <BackgroundParticles />}
          {!isAuthPage && <EditModeToggle />}
          {!isAuthPage && <Navbar />}

          <main className="flex-grow w-full relative z-10">
            <AnimatePresence mode="wait">
              <PageTransition key={location}>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/world" component={World} />
                  <Route path="/map" component={Map} />
                  <Route path="/tribes" component={Tribes} />
                  <Route path="/legends" component={Legends} />
                  <Route path="/artifacts" component={Artifacts} />
                  <Route path="/game" component={Game} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/verify-email" component={VerifyEmailPage} />
                  <Route path="/admin" component={AdminPage} />
                  <Route path="/ecologie" component={Ecologie} />
                  <Route path="/histoire" component={Histoire} />
                  <Route path="/humanite" component={Humanite} />
                  <Route path="/economie" component={Economie} />
                  <Route path="/politique" component={Politique} />
                  <Route path="/characters" component={Characters} />
                  <Route path="/character/:id" component={CharacterDetail} />
                  <Route path="/team" component={Team} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/vote" component={Vote} />
                  <Route component={NotFound} />
                </Switch>
              </PageTransition>
            </AnimatePresence>
          </main>

          {!isAuthPage && <Footer />}
          <Toaster />
        </div>
      </AuthGuard>
    </EditModeProvider>
  );
}

export default App;