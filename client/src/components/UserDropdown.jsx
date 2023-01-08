import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';


const UserDropdown = (options) => {
    const { user, logout } = options;

    return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
                <div>
                    <Menu.Button className="flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2
                                            focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full"
                            src={user.avatar ? user.avatar : '' +
                                'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                            alt=""
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md
                                           bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5
                                           focus:outline-none divide-y divide-gray-100 rounded shadow">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">{ user.username }</span>
                            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                                { user.email }
                            </span>
                        </div>
                        <div>
                            <Menu.Item>
                                {({ active }) => (
                                    <a href="#"
                                        className={
                                            `${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`
                                        }
                                    >
                                        Your Profile
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a href="#"
                                        className = {
                                            `${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`
                                        }
                                    >
                                        Settings
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <span className={
                                        `${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`
                                    }
                                    onClick={ logout }>
                                        Sign out
                                    </span>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default UserDropdown;
