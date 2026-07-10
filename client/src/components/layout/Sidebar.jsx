import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  ChartNoAxesCombined,
  LogOut,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Paper Library",
    icon: BookOpen,
    path: "/library",
  },
  {
    title: "Analytics",
    icon: ChartNoAxesCombined,
    path: "/analytics",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg border-r">

      <div className="h-20 flex items-center justify-center border-b">

        <h1 className="text-xl font-bold text-indigo-600">
          Research Tracker
        </h1>

      </div>

      <nav className="p-4 space-y-2">

        {menus.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg p-3 transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />

              {item.title}
            </NavLink>
          );
        })}

      </nav>

      <div className="absolute bottom-6 left-4">

        <button className="flex items-center gap-3 rounded-lg p-3 hover:bg-red-50 text-red-600">

          <LogOut />

          Logout

        </button>

      </div>

    </aside>
  );
}