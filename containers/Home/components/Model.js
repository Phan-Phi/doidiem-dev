import * as THREE from "three";
import { useGLTF } from "@react-three/drei/core/useGLTF";
import { useState, useEffect } from "react";

import { convertAngleToRad } from "../../../libs";

export default function Model({ data }) {
  const [video] = useState(() => {
    return Object.assign(document.createElement("video"), {
      src: data.file || "models/phone/texture/video.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
      playsInline: true,
    });
  });

  useEffect(() => {
    video.play();
  }, []);

  const { nodes, materials } = useGLTF("models/phone/final2.glb");

  return (
    <group dispose={null} rotation={[0, convertAngleToRad(180), 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012.geometry}
        material={materials.Frame}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_1.geometry}
        material={materials.Logo}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_2.geometry}
        material={materials.Body}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_3.geometry}
        material={materials.Bezel}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_4.geometry}
        material={materials["Camera Glass"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_5.geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_6.geometry}
        material={materials.Glass}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_7.geometry}
        material={materials.Antenna}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_8.geometry}
        material={materials["Camera Frame"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_9.geometry}
        material={materials["Black Glass"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_10.geometry}
        material={materials["Gray Glass"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_11.geometry}
        material={materials.Port}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_12.geometry}
        material={materials.Flash}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle012_13.geometry}
        material={materials["Material.002"]}
      />
      <mesh geometry={nodes.screen.geometry}>
        <meshBasicMaterial toneMapped={false}>
          <videoTexture
            attach="map"
            args={[video]}
            encoding={THREE.sRGBEncoding}
            flipY={false}
          />
        </meshBasicMaterial>
      </mesh>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials["Frame.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1.geometry}
          material={materials["Frame2.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2.geometry}
          material={materials["Mic.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_3.geometry}
          material={materials["Port.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_4.geometry}
          material={materials["Antenna.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/phone/final2.glb");
