import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Table, Kanban, Briefcase } from 'lucide-react';

const Sidebar = () => {
  const menu = [
    { name: 'Dashboard', icon: LayoutDashboard, to: '/' },
    { name: 'Tables', icon: Table, to: '/tables' },
    { name: 'Kanban', icon: Kanban, to: '/kanban' },
    { name: 'Calendar', icon: Calendar, to: '/calendar' },
    {name : 'Work', icon: Briefcase, to: '/work' }
  ];
  return (
    <div className="h-screen w-64 fixed bg-white dark:bg-gray-700 shadow-lg p-4">
      <h1 className="text-2xl font-bold text-center text-indigo-600 dark:text-purple-400 mb-8">Admin Panel</h1>
      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            to={item.to}
            key={item.name}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-indigo-100 dark:hover:bg-gray-300 ${
                isActive ? 'bg-indigo-200 dark:bg-gray-200 font-semibold' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
