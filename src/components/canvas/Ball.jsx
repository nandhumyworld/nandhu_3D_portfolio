import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = ({ imgUrl, color = "#e6d8b0" }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 3, 3]} intensity={0.9} />
      <directionalLight position={[-3, -1, -2]} intensity={0.35} color='#8ab6ff' />
      <mesh castShadow receiveShadow scale={2.75}>
        {/* detail=4 → smooth sphere; smoothing removes the flat-shaded facets */}
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial
          color={color}
          polygonOffset
          polygonOffsetFactor={-5}
          roughness={0.35}
          metalness={0.25}
        />
        {/* Two decals on opposite hemispheres so the logo is visible from
            either side while the ball auto-rotates. */}
        <Decal
          position={[0, 0, 1]}
          rotation={[0, 0, 0]}
          scale={1}
          map={decal}
        />
        <Decal
          position={[0, 0, -1]}
          rotation={[0, Math.PI, 0]}
          scale={1}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, color }) => {
  return (
    <Canvas
      frameloop='always'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
        />
        <Ball imgUrl={icon} color={color} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
