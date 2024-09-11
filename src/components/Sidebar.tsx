import { useState } from "react";
import {
  Cog6ToothIcon,
  HomeIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";

const sidebarItemsTop = [
  { name: "Inicio", href: "/main", icon: HomeIcon },
  { name: "Buscar (CPF)", href: "/cpf-search", icon: Search },
  { name: "Adicionar Usuario", href: "/create-user", icon: UserPlusIcon },
];

const sidebarItemBottom = {
  name: "Configurações",
  href: "/config",
  icon: Cog6ToothIcon,
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-zinc-800 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`flex flex-col bg-zinc-900 text-white lg:row-start-2 lg:row-end-12 lg:col-span-2 ${isOpen ? "fixed inset-y-0 left-0 z-20 w-64" : "hidden"} lg:block`}
      >
        <nav className="flex-1 overflow-y-auto">
          <ul className="px-2 py-4 flex-grow">
            {sidebarItemsTop.map((item) => (
              <li key={item.name} className="mb-2">
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-2 text-zinc-300 hover:bg-zinc-700 rounded-lg"
                >
                  <item.icon className="h-6 w-6 mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-2 py-4">
          <ul>
            <li>
              <Link
                href={sidebarItemBottom.href}
                className="flex items-center px-4 py-2 text-zinc-300 hover:bg-zinc-700 rounded-lg"
              >
                <sidebarItemBottom.icon className="h-6 w-6 mr-3" />
                {sidebarItemBottom.name}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
