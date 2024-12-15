import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/images/logo.png';

import { UserDropdown } from '../components';


const Dashboard = () => {
    const navigation = [
        { name: 'Home', href: '/', current: true },
        { name: 'Projects', href: '/projects', current: false },
        { name: 'Articles', href: '/articles', current: false },
        { name: 'About', href: '/about', current: false },
    ];

    return (
        <Disclosure as="nav" className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2
                                 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2
                                  focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img className="hidden h-8 w-auto md:block"
                                        src={logo}
                                        alt="Lawrences.tech"
                                        crossOrigin="anonymous"
                                    />
                                </div>
                                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                                    id="mobile-menu-2">
                                    <ul className="flex flex-col p-4 pl-12 mt-4 border border-gray-100 rounded-lg
                                     bg-gray-50 md:flex-row md:space-x-12 md:mt-0 md:text-sm md:font-medium
                                      md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900
                                       dark:border-gray-700">
                                        <li>
                                            <a href="/"
                                                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100
                                                 md:hover:bg-transparent md:hover:text-blue-700 md:p-0
                                                  dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700
                                                   dark:hover:text-white md:dark:hover:bg-transparent
                                                    dark:border-gray-700"
                                                aria-current="page">Home</a>
                                        </li>
                                        <li>
                                            <a href="/projects"
                                                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100
                                                 md:hover:bg-transparent md:hover:text-blue-700 md:p-0
                                                  dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700
                                                   dark:hover:text-white md:dark:hover:bg-transparent
                                                    dark:border-gray-700">Projects</a>
                                        </li>
                                        <li>
                                            <a href="/articles"
                                                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100
                                                 md:hover:bg-transparent md:hover:text-blue-700 md:p-0
                                                  dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700
                                                   dark:hover:text-white md:dark:hover:bg-transparent
                                                    dark:border-gray-700">Articles</a>
                                        </li>
                                        <li>
                                            <a href="/about"
                                                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100
                                                 md:hover:bg-transparent md:hover:text-blue-700 md:p-0
                                                  dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700
                                                   dark:hover:text-white md:dark:hover:bg-transparent
                                                    dark:border-gray-700">About</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* Dropdown menu should be hidden if the user is not available,
                            otherwise sign up / sign in button */}

                            <UserDropdown />
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={
                                        `${item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700' +
                                            ' hover:text-white'} block px-3 py-2 rounded-md text-base font-medium`
                                    }
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Dashboard;
