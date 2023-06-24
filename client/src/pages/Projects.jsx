import { Footer, Navbar } from '../components';

import githubLogo from '../assets/images/github-mark.svg';

const Projects = () => {
    return (
        <div>
            <Navbar/>
            <div className="flex flex-col mx-auto min-h-screen space-y-5 w-1/2 mt-10">
                <a href="#"
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row
                    md:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none
                    md:rounded-l-lg"
                    src={githubLogo} alt=""></img>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                            technology acquisitions 2021</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                                    technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </div>
                </a>
                <a href="#"
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row
                    md:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none
                    md:rounded-l-lg"
                    src={githubLogo} alt=""></img>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                                    technology acquisitions 2021</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                                    technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </div>
                </a>
                <a href="#"
                    className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row
                    md:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none
                    md:rounded-l-lg"
                    src={githubLogo} alt=""></img>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy
                                    technology acquisitions 2021</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise
                                    technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    </div>
                </a>
            </div>
            <Footer/>
        </div>
    );
};

export default Projects;
