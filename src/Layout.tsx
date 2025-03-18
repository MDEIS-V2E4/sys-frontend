import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from "@heroicons/react/24/outline";


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const navigationItems = [
  { name: 'Dashboard', href: '/', title: 'Dashboard' },
  { name: 'Clients', href: '/clientes', title: 'Clients', add: '/cliente' },
  {
    name: 'Employees',
    href: '/empleados',
    title: 'Employees',
    add: '/empleado',
  },
  { name: 'Products', href: '/productos', title: 'Products', add: '/producto' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState(navigationItems);
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [addView, setAddView] = useState(false);
  const [urlAdd, setuUrlAdd] = useState('');

  useEffect(() => {
    setNavigation(
      navigationItems.map((item) => ({
        ...item,
        current: item.href === location.pathname,
      })),
    );

    const currentPage = navigationItems.find((item) =>
      item.href.includes(location.pathname.split('/')[1]),
    );
    setPageTitle(currentPage ? currentPage.name : 'Dashboard');
    setAddView(!!currentPage?.add);
    setuUrlAdd(currentPage?.add ? currentPage?.add : '');
  }, [location]);

  const handleClickAdd = () => {
    navigate(urlAdd);
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="size-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <ul className="flex space-x-4">
                      {navigation.map((item) => (
                        <li>
                          <Link
                            key={item.name}
                            to={item.href}
                            // aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                              'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium',
                            )}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={user.imageUrl}
                          className="size-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      {/* {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))} */}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  //   aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={user.imageUrl}
                    className="size-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="flex items-center text-3xl font-bold tracking-tight text-gray-900">
              {pageTitle}{' '}
              {addView &&
              <button
              type="submit"
              className="ml-2 px-2 bg-purple-600 text-white rounded hover:bg-purple-800"
              onClick={handleClickAdd}
            >
              <PlusIcon className="h-8 w-6 text-white" />
            </button> }
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <main className="py-4">
              <Outlet />
            </main>
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
