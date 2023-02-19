import Navbar from '../components/Navbar';
import LorenzAttractor from '../components/LorenzSimulation';
import { useState } from 'react';
import RangeSlider from '../components/RangeSlider';

const Dashboard = () => {
    const [simulationValues, setSimulationValues] = useState({
        numAgents: 5,
        sphereRadius: 0.5,
        timeStep: 0.001,
        startRange: 1,
    });

    const setSphereRadius = (e) => {
        setSimulationValues({ ...simulationValues, sphereRadius: e.target.value });
    };

    const setStartRange = (e) => {
        setSimulationValues({ ...simulationValues, startRange: e.target.value });
    };

    const setTimeStep = (e) => {
        setSimulationValues({ ...simulationValues, timeStep: e.target.value });
    };

    const setNumAgents = (e) => {
        setSimulationValues({ ...simulationValues, numAgents: e.target.value });
    };

    return (
        <div>
            <Navbar />

            <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl
            lg:text-4xl dark:text-white" style={{ textAlign: 'center', marginTop: '3%' }}>
                Lorenz Attractor
            </h1>
            <p className="mb-1 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                A Lorenz Attractor is a type of strange attractor. It is a system of ordinary differential equations
                first studied by Edward Lorenz. It is notable for having chaotic solutions for certain parameter values
                and initial conditions, while being globally stable (basically, the system will always return to the
                attractor, no matter how far away it starts).
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '50%', marginTop: '3%', marginRight: '15px', marginBottom: '15%' }}>
                <div style={{ width: '50%', height: '100%', display: 'block', marginRight: '5%' }}>
                    <LorenzAttractor numAgents={simulationValues.numAgents}
                        sphereRadius={simulationValues.sphereRadius}
                        timeStep={simulationValues.timeStep}
                        startRange={simulationValues.startRange} />
                    <style>
                        {`
                            @media (min-width: 800px) {
                                div[ref="containerRef"] {
                                    width: 50%;
                                    height: 50%;
                                    margin-top: 25%;
                                    margin-right: 25%;
                                }
                            }
                        `}
                    </style>
                </div>
                <div className="relative h-full w-1/4 absolute z-10 w-auto grid-cols-2 text-sm bg-white
                border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700">
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-4">Toolbar</h3>
                        <label htmlFor="default-range"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Sphere Radius
                        </label>
                        <RangeSlider value={simulationValues.sphereRadius}
                            onChange={setSphereRadius} min={0.1} max={1} step={0.1} />
                        <label htmlFor="default-range"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Start Range
                        </label>
                        <RangeSlider value={simulationValues.startRange}
                            onChange={setStartRange} min={0.1} max={1} step={0.1} />
                        <label htmlFor="default-range"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Time Step
                        </label>
                        <RangeSlider value={simulationValues.timeStep}
                            onChange={setTimeStep} min={0.0005} max={0.01} step={0.001} />
                        <label htmlFor="default-range"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Number of Spheres
                        </label>
                        <RangeSlider value={simulationValues.numAgents}
                            onChange={setNumAgents} min={1} max={20} step={1} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
