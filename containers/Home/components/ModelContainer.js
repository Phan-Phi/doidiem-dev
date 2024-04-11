import { BackSide } from "three";
import { useRef, Fragment } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";

import { useMedia } from "../../../hooks";
import Model from "./Model";

export default function ModelContainer({ data }) {
  const modelRef = useRef(null);

  const { isMdDown } = useMedia();

  useFrame((state) => {
    if (!!modelRef.current) {
      const { x, y } = state.mouse;

      // modelRef.current.setAzimuthalAngle(-x * convertAngleToRad(30));
      // modelRef.current.setPolarAngle((y + 1) * convertAngleToRad(90 - 30));
      // modelRef.current.update();
      modelRef.current.rotation.x = -y * 0.5;
      modelRef.current.rotation.y = x * 0.5;
    }
  });

  return (
    <Fragment>
      <PerspectiveCamera makeDefault position={[0, 0, 1.4]} />

      <group ref={modelRef} position={[isMdDown ? 0 : 0, 0, 0]}>
        <Model data={data} />
      </group>

      <ambientLight args={["#ffffff", 0.25]} />

      <Environment>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial side={BackSide} color="#ffffff" />
        </mesh>
      </Environment>
    </Fragment>
  );
}
{
  /* <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={convertAngleToRad(75)}
        maxPolarAngle={convertAngleToRad(105)}
        enableZoom={false}
        // target={[1, 0, 0]}
      /> */
}
