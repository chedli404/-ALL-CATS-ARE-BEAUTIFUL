import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Characters from "@/pages/Characters";
import CharacterDetail from "@/pages/CharacterDetail";
import Map from "@/pages/Map";
import Game from "@/pages/Game";
import Tribes from "@/pages/Tribes";
import Legends from "@/pages/Legends";
import Artifacts from "@/pages/Artifacts";
import NotFound from "@/pages/not-found";
import world from "@/pages/world";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-earth-dark">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/world" component={world} />
          <Route path="/characters" component={Characters} />
          <Route path="/characters/:id" component={CharacterDetail} />
          <Route path="/map" component={Map} />
          <Route path="/tribes" component={Tribes} />
          <Route path="/legends" component={Legends} />
          <Route path="/artifacts" component={Artifacts} />
          <Route path="/game" component={Game} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
