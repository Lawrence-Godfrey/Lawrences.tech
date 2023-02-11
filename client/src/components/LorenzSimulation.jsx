import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Renders a 3D scene with a Lorenz Attractor
 * simulation.
 * @return {JSX.Element}
 */
const LorenzAttractor = () => {
    const containerRef = useRef(null);

    const cameraPosition = [-24, 5, -16]; // Camera position
    const cameraLookAt = [-12, 0, 5]; // The point to set the camera to point to
    const numAgents = 500; // Number of agents (spheres or particles) to render
    const startRange = 1; // The agents start between 0 and this value
    const sphereRadius = 0.3; // The radius of the agent spheres
    const timeStep = 0.005; // The time step for the simulation. Higher means faster

    const createAgents = (numAgents) => {
        const agents = [];
        for (let i = 0; i < numAgents; i++) {
            // Create an agent with random x,y,z coordinates
            // between 0 and a set value
            const coords = {
                x: Math.random() * startRange,
                y: Math.random() * startRange,
                z: Math.random() * startRange,
            };
            // Create a sphere geometry and give it a random colour
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(sphereRadius),
                new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff }),
            );
            sphere.position.set(coords.x, coords.y, coords.z);
            agents.push({ coords, sphere });
        }
        return agents;
    };

    const update = (agents) => {
        for (const agent of agents) {
            const dx = 10 * (agent.coords.y - agent.coords.x);
            const dy = agent.coords.x * (28 - agent.coords.z) - agent.coords.y;
            const dz = agent.coords.x * agent.coords.y - (8 / 3) * agent.coords.z;

            agent.coords.x += dx * timeStep;
            agent.coords.y += dy * timeStep;
            agent.coords.z += dz * timeStep;

            agent.sphere.position.set(agent.coords.x, agent.coords.y, agent.coords.z);
        }
    };

    useEffect(() => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );
        camera.position.set(...cameraPosition);

        const renderer = new THREE.WebGLRenderer();
        // Set the size of the renderer to half the size of the window
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        containerRef.current.appendChild(renderer.domElement);

        // Allow the user to move the camera
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(...cameraLookAt);
        controls.update();

        const agents = createAgents(numAgents);

        for (const agent of agents) {
            scene.add(agent.sphere);
        }

        // Render the updated state
        const animate = () => {
            update(agents);
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            containerRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div ref={containerRef}
            style={{ width: '50%', height: '50%', display: 'block', margin: '0 auto', marginTop: '5%' }}>
            <style>
                {`
                    @media (min-width: 800px) {
                        div[ref="containerRef"] {
                            width: 50%;
                            height: 50%;
                            margin-top: 25%;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default LorenzAttractor;
