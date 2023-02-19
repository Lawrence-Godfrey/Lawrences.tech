import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Renders a 3D scene with a Lorenz Attractor
 * simulation.
 * @param {Number} sphereRadius - The radius of the spheres
 * @param {Number} numAgents - The number of agents to render
 * @param {Number} startRange - The range of the starting coordinates
 * @param {Number} timeStep - The time step for the simulation
 * @return {JSX.Element}
 */
const LorenzAttractor = ({
    sphereRadius = 0.3,
    numAgents = 10,
    startRange = 1,
    timeStep = 0.005,
}) => {
    const containerRef = useRef(null);
    const agentsRef = useRef([]);
    const animationFrameRef = useRef(null);
    const timeStepRef = useRef(timeStep);

    const cameraPosition = [-24, 5, -16]; // Camera position
    const cameraLookAt = [-12, 0, 5]; // The point to set the camera to point to

    const createAgents = (numAgents, sphereRadius, startRange) => {
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

            agent.coords.x += dx * timeStepRef.current;
            agent.coords.y += dy * timeStepRef.current;
            agent.coords.z += dz * timeStepRef.current;

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

        agentsRef.current = createAgents(numAgents, sphereRadius, startRange);

        for (const agent of agentsRef.current) {
            scene.add(agent.sphere);
        }

        // Render the updated state
        const animate = () => {
            update(agentsRef.current);
            controls.update();
            renderer.render(scene, camera);
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        // Cancel the current animation frame before starting a new one
        cancelAnimationFrame(animationFrameRef.current);
        animate();

        return () => {
            for (const agent of agentsRef.current) {
                scene.remove(agent.sphere);
            }
            agentsRef.current = [];
            containerRef.current.removeChild(renderer.domElement);
            renderer.dispose();
            renderer.forceContextLoss();
            // Cancel the current animation frame when the component is unmounted
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [numAgents, startRange]);

    useEffect(() => {
        for (const agent of agentsRef.current) {
            agent.sphere.geometry.dispose();
            agent.sphere.geometry = new THREE.SphereGeometry(sphereRadius);
        }
    }, [sphereRadius]);

    useEffect(() => {
        timeStepRef.current = timeStep;
    }, [timeStep]);

    return (
        <div ref={containerRef} />
    );
};

export default LorenzAttractor;
