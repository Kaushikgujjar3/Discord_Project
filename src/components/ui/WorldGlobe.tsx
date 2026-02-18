"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function GlobeComponent() {
    const globeRef = useRef<any>(null);
    const [GlobeObject, setGlobeObject] = useState<any>(null);

    useEffect(() => {
        const loadGlobe = async () => {
            const ThreeGlobe = (await import("three-globe")).default;

            const globe = new ThreeGlobe()
                .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
                .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png");


            // Dummy users
            const users = [
                { lat: 28.6139, lng: 77.2090 },
                { lat: 40.7128, lng: -74.0060 },
                { lat: 51.5072, lng: -0.1276 },
                { lat: 35.6895, lng: 139.6917 },
            ];

            globe
                .pointsData(users)
                .pointAltitude(0.02)
                .pointColor(() => "#ef4444")
                .pointRadius(0.4);

            globe.arcsData([
                { startLat: 28.6139, startLng: 77.2090, endLat: 40.7128, endLng: -74.0060 },
            ])
                .arcColor(() => "#dc2626")
                .arcAltitude(0.2)
                .arcDashLength(0.4)
                .arcDashGap(4)
                .arcDashAnimateTime(2000);

            globeRef.current = globe;
            setGlobeObject(globe);
        };

        loadGlobe();
    }, []);

    useFrame(() => {
        if (globeRef.current) {
            globeRef.current.rotation.y += 0.002;
        }
    });

    return GlobeObject ? <primitive object={GlobeObject} /> : null;
}

export default function WorldGlobe() {
    return (
        <div className="w-full h-[450px] sm:h-[550px]  rounded-3xl">
            <Canvas camera={{ position: [0, 0, 400], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[200, 200, 200]} intensity={1.5} />
                <pointLight position={[-200, -200, -200]} intensity={1} />
                <GlobeComponent />
                <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>

        </div>
    );
}
