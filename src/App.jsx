import { lazy, Suspense } from "react";

import Nav from "./components/shared/Nav";
import FloatingCTA from "./components/shared/FloatingCTA";
import RoomDivider from "./components/shared/RoomDivider";
import NebulaBackground from "./components/shared/NebulaBackground";
import MilkyWayGalaxy from "./components/shared/MilkyWayGalaxy";

const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

import Hero from "./components/rooms/Hero";
import Human from "./components/rooms/Human";
import Story from "./components/rooms/Story";
import Career from "./components/rooms/Career";
import Certifications from "./components/rooms/Certifications";
import EyediaWorks from "./components/rooms/EyediaWorks";
import Coach from "./components/rooms/Coach";
import Tribe from "./components/rooms/Tribe";
import Farm from "./components/rooms/Farm";
import Seeker from "./components/rooms/Seeker";
import Connect from "./components/rooms/Connect";

import { dividers } from "./content/dividers";

export default function App() {
  return (
    <div className="bg-bg-dark text-text-dark min-h-screen relative isolate">
      {/* Deepest parallax layer — Milky Way galactic band, scrolls at 0.3x. */}
      <MilkyWayGalaxy />

      {/* Mid parallax layer — nebula clouds, scrolls at 0.5x. */}
      <NebulaBackground />

      {/* Above the nebula — fixed star field that stays put while you scroll,
          so stars appear to drift past the nebula clouds. */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
      </div>

      <Nav />
      <main className="relative z-10">
        <Hero />
        <RoomDivider line={dividers[0]} />
        <Human />
        <RoomDivider line={dividers[1]} />
        <Story />
        <RoomDivider line={dividers[2]} />
        <Career />
        <RoomDivider line={dividers[3]} />
        <Certifications />
        <RoomDivider line={dividers[4]} />
        <EyediaWorks />
        <RoomDivider line={dividers[5]} />
        <Coach />
        <RoomDivider line={dividers[6]} />
        <Tribe />
        <RoomDivider line={dividers[7]} />
        <Farm />
        <RoomDivider line={dividers[8]} />
        <Seeker />
        <RoomDivider line={dividers[9]} />
        <Connect />
      </main>
      <FloatingCTA />
    </div>
  );
}
