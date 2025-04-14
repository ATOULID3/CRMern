import { Link } from 'react-router-dom';
import { IconMenu, IconSearch, IconBell } from './Icons';

const DashboardHeader = ({ user }: { user: any }) => {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden">
              <IconMenu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center md:hidden">
              <Link to="/" className="text-xl font-bold text-primary-600">
                D
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                New Project
              </button>
            </div>
            <div className="hidden md:ml-4 md:flex md:items-center md:space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <IconSearch className="h-6 w-6" />
              </button>
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <IconBell className="h-6 w-6" />
                <span className="sr-only">View notifications</span>
              </button>
              <div className="ml-3 relative">
                <div>
                  <button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                      {user?.username?.charAt(0).toUpperCase()}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;