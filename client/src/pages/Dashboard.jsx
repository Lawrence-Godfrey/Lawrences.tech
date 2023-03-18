import { Navbar, Footer, LorenzAttractor, RangeSlider } from '../components';
import { useState } from 'react';
import { Accordion } from 'flowbite-react';

const Dashboard = () => {
    const [simulationValues, setSimulationValues] = useState({
        numAgents: 5,
        sphereRadius: 0.5,
        timeStep: 0.001,
        startRange: 1,
        linesOn: true,
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

    const toggleLines = () => {
        setSimulationValues({ ...simulationValues, linesOn: !simulationValues.linesOn });
    };

    return (
        <div>
            <Navbar />

            <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl
            lg:text-4xl dark:text-white" style={{ textAlign: 'center', marginTop: '3%' }}>
                Lorenz Attractor
            </h1>
            <p className="mb-1 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                A Lorenz Attractor is a type of <a href="https://en.wikipedia.org/wiki/Attractor#Strange_attractor"
                    className="font-medium text-blue-600 underline
                dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:no-underline">
                strange attractor</a>. It is a system of ordinary differential equations
                first studied by Edward Lorenz. It is notable for having chaotic solutions for certain parameter values
                and initial conditions, while being globally stable (basically, the system will always return to the
                attractor, no matter how far away it starts).

            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '50%', marginTop: '3%', marginRight: '15px', marginBottom: '5%' }}>
                <div style={{ width: '50%', height: '100%', display: 'block', marginRight: '5%' }}>
                    <LorenzAttractor numAgents={simulationValues.numAgents}
                        sphereRadius={simulationValues.sphereRadius}
                        timeStep={simulationValues.timeStep}
                        startRange={simulationValues.startRange}
                        linesOn={simulationValues.linesOn}
                    />
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
                <div className="relative h-full w-1/4 absolute z-10 w-auto grid-cols-1 text-sm bg-white
                border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-2 dark:bg-gray-700">
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-4">Toolbar</h3>
                        <label htmlFor="default-range"
                            className="block mb-1 mt-1 text-sm font-medium text-gray-900 dark:text-white">
                            Lines
                        </label>
                        <div className="flex justify-center">
                            <label className="relative inline-flex items-center cursor-pointer justify-center mb-4">
                                <input type="checkbox" value="" className="sr-only peer" onClick={toggleLines}
                                    checked={simulationValues.linesOn} ></input>
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                                    peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer
                                    dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white
                                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                                    after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                                    after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                </div>
                            </label>
                        </div>
                        <hr className="w-48 h-px mx-auto my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <label htmlFor="default-range"
                            className="block mb-1 mt-1 text-sm font-medium text-gray-900 dark:text-white">
                            Sphere Radius
                        </label>
                        <div className="flex justify-center">
                            <RangeSlider value={simulationValues.sphereRadius}
                                onChange={setSphereRadius} min={0.1} max={1} step={0.1} />
                        </div>
                        <hr className="w-48 h-px mx-auto my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <label htmlFor="default-range"
                            className="block mb-1 mt-1 text-sm font-medium text-gray-900 dark:text-white">
                            Start Range
                        </label>
                        <div className="flex justify-center">
                            <RangeSlider value={simulationValues.startRange}
                                onChange={setStartRange} min={0.1} max={1} step={0.1} />
                        </div>
                        <hr className="w-48 h-px mx-auto my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <label htmlFor="default-range"
                            className="block mb-1 mt-1 text-sm font-medium text-gray-900 dark:text-white">
                            Time Step
                        </label>
                        <div className="flex justify-center">
                            <RangeSlider value={simulationValues.timeStep}
                                onChange={setTimeStep} min={0.0005} max={0.01} step={0.001} />
                        </div>
                        <hr className="w-48 h-px mx-auto my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <label htmlFor="default-range"
                            className="block mb-1 mt-1 text-sm font-medium text-gray-900 dark:text-white">
                            Number of Spheres
                        </label>
                        <div className="flex justify-center">
                            <RangeSlider value={simulationValues.numAgents}
                                onChange={setNumAgents} min={1} max={20} step={1} />
                        </div>
                    </div>
                </div>
            </div>

            <Accordion alwaysOpen={true} style={{ width: '50%', margin: '0 auto' }}>
                <Accordion.Panel>
                    <Accordion.Title>
                        How it Works
                    </Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            This implementation of the Lorenz attractor uses `three.js` to render the simulation
                            in real-time within a web browser. Because it is rendered in real-time,
                            we can interact with it by changing the parameters of the simulation,
                            and moving the camera around in 3D space.
                        </p>
                        <br></br>
                        <p className="text-gray-500 dark:text-gray-400">
                            <h2 className="mb-2 text-lg font-bold text-gray-500 dark:text-white">
                                Camera Controls
                            </h2>
                            <ul className="max-w-2xl space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                <li>
                                    To move the camera around, click and drag with the left mouse button.
                                </li>
                                <li>
                                    To zoom in and out, use the scroll wheel.
                                </li>
                                <li>
                                    To pan the camera, click and drag with the right mouse button.
                                </li>
                            </ul>
                            <br></br>
                            <h2 className="mb-2 text-lg font-bold text-gray-500 dark:text-white">
                                Simulation Parameters
                            </h2>
                            <ul className="max-w-2xl space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                <li>
                                    The `Sphere Radius` slider controls the radius of the spheres in the simulation.
                                </li>
                                <li>
                                    The `Start Range` slider controls the range of the initial positions of the spheres.
                                    The closer the spheres are to the origin, the longer it takes for them to become
                                    chaotic.
                                </li>
                                <li>
                                    The `Time Step` slider controls the speed of the simulation.
                                </li>
                                <li>
                                    The `Number of Spheres` slider controls the number of spheres in the simulation.
                                </li>
                                <li>
                                    The `Lines` checkbox toggles the visibility of the trailing lines of the spheres.
                                </li>
                            </ul>
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>

            <br></br>

            <Footer />
        </div>
    );
};

export default Dashboard;
