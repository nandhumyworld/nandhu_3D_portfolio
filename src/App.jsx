import Nav from "./components/shared/Nav";
import FloatingCTA from "./components/shared/FloatingCTA";
import Hero from "./components/rooms/Hero";
import Seeker from "./components/rooms/Seeker";

export default function App() {
  return (
    <div className="bg-bg-dark text-text-dark min-h-screen">
      <Nav />
      <main>
        <Hero />
        {/* Rooms in scroll order; each is added as content is captured */}
        {/* Story · Coach · Tribe · eyediaWorks · Farm · Human · Career · Certifications — pending */}
        <Seeker />
        {/* Connect — pending */}
      </main>
      <FloatingCTA />
    </div>
  );
}
