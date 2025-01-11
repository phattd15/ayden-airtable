"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiMenu, FiBell, FiHelpCircle, FiUser, FiSearch } from "react-icons/fi";

export default function TopNav() {
  const { data: session } = useSession();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    router.push("/api/auth/signout");
  };

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-white px-4 py-2 shadow-md">
      <div className="flex items-center">
        <button
          onClick={toggleSideNav}
          className="flex items-center text-xl"
          aria-label="Toggle side navigation"
        >
          <FiMenu />
        </button>
      </div>

      <div className="relative mx-auto max-w-xl flex-grow">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-l-full rounded-r-full p-2 pl-8 hover:shadow-lg focus:outline-none"
        />
        <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 transform text-xl text-gray-500" />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button>
            <FiHelpCircle className="text-xl" />
          </button>
          <span className="hidden sm:block">Help</span>
        </div>

        <button>
          <FiBell className="text-xl" />
        </button>

        {session?.user ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center">
              <img
                src={session.user.image ?? "/default-avatar.png"}
                alt="User Profile"
                className="h-8 w-8 rounded-full"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border bg-white shadow-lg">
                <ul>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button className="text-xl">
            <FiUser />
          </button>
        )}
      </div>
    </nav>
  );
}
