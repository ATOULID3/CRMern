import { NavLink } from 'react-router-dom';
import { IconChartBar, IconUser, IconSettings, IconLogout } from './Icons';

const DashboardSidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-primary-600">Dashboard</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
              }
            >
              <IconChartBar className="mr-3 flex-shrink-0 h-6 w-6" />
              Overview
            </NavLink>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
              }
            >
              <IconUser className="mr-3 flex-shrink-0 h-6 w-6" />
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
              }
            >
              <IconSettings className="mr-3 flex-shrink-0 h-6 w-6" />
              Settings
            </NavLink>
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <IconLogout className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Sign out
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;