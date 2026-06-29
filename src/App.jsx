import Nav from "./components/shared/Nav";
import FloatingCTA from "./components/shared/FloatingCTA";
import Hero from "./components/rooms/Hero";
import Seeker from "./components/rooms/Seeker";
import Connect from "./components/rooms/Connect";

export default function App() {
  return (
    <div className="bg-bg-dark text-text-dark min-h-screen">
      <Nav />
      <main>
        <Hero />
        {/* Story · Coach · Tribe · eyediaWorks · Farm · Human · Career · Certifications — pending */}
        <Seeker />
        <Connect />
      </main>
      <FloatingCTA />
    </div>
  );
}
