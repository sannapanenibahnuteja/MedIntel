"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  FileText,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const menu = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Patients",
      href: "/patients",
      icon: Users,
    },
    {
      name: "Doctors",
      href: "/doctors",
      icon: UserCog,
    },
    {
      name: "Appointments",
      href: "/appointments",
      icon: Calendar,
    },
    {
      name: "Medical Records",
      href: "/medical-records",
      icon: FileText,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        MedIntel
      </h1>

      <nav className="space-y-3">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg p-3 transition ${
                pathname === item.href
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}

      </nav>

      <button
        onClick={logout}
        className="mt-12 flex items-center gap-3 rounded-lg bg-red-600 px-4 py-3 hover:bg-red-700"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}