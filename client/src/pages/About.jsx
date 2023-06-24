import { Footer, Navbar } from '../components';
import githubLogo from '../assets/images/github-mark.svg';
import linkedInLogo from '../assets/images/linkedin.svg';
import emailLogo from '../assets/images/email.png';

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div className="bg-white shadow-md p-8 rounded-lg w-full min-h-screen m-8">
                    <div className="overflow-y-auto">
                        <h1 className="text-3xl font-bold mb-4">About This Website</h1>
                        <p className="text-gray-600 mb-8">
                            This site, built using the MERN (MongoDB, Express, React, Node.js) stack,
                             is intended to serve as a portfolio of various projects I&apos;ve worked on.
                            in my free time.
                        </p>

                        <div
                            className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6
                            dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                                Links
                            </h5>
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Here are some links to my relevant profiles and accounts.
                            </p>
                            <ul className="my-4 space-y-3">
                                <li>
                                    <a href="https://github.com/Lawrence-Godfrey"
                                        className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg
                                        bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600
                                        dark:hover:bg-gray-500 dark:text-white">
                                        <img src={githubLogo} alt="GitHub Logo" className="h-5" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">GitHub</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/lawrence-godfrey/"
                                        className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg
                                        bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600
                                        dark:hover:bg-gray-500 dark:text-white">
                                        <img src={linkedInLogo} alt="LinkedIn Logo" className="h-5" />
                                        <span className="flex-1 ml-3 whitespace-nowrap">LinkedIn</span>
                                    </a>
                                </li>
                                <li>
                                    <a id="myEmail" className="flex items-center p-3 text-base font-bold
                                    text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow
                                    dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                                    >
                                        <img src={emailLogo} alt="Email Logo" className="h-5"/>
                                        <span className="flex-1 ml-3 whitespace-nowrap">Email</span>
                                        <button
                                            className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs
                                            font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700
                                            dark:text-gray-400" onClick={() => {
                                                navigator.clipboard.writeText('lawrencegodfrey58@gmail.com');
                                                // Change button text to "Copied!" for 2 seconds
                                                const button = document.getElementById('myEmail').lastChild;
                                                button.textContent = 'Copied!';
                                                setTimeout(() => {
                                                    button.textContent = 'Copy to clipboard';
                                                }, 2000);
                                            }}
                                        >
                                            Copy to clipboard
                                        </button>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
