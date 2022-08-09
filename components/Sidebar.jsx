import React from "react";
import {
  FolderIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  ClipboardCheckIcon,
  XCircleIcon,
  UserAddIcon,
  CogIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { useContextState } from "../contexts/ContextProvider";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, screenSize } = useContextState();

  const router = useRouter();

  const handleCloseSidebar = () => {
    if (isSidebarOpen && screenSize <= 900) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div
      className="flex flex-col text-white justify-between h-screen 
     md:overflow-hidden oveflow-auto md:hover:overflow-auto pb-5"
    >
      <div className="px-3">
        {isSidebarOpen && (
          <div className="flex justify-between items-center px-1 mt-2">
            <div className="font-semibold text-2xl">Taskit</div>
            <button
              className="md:hidden t-full hover:bg-light-gray"
              onClick={() => {
                setIsSidebarOpen((previousState) => !previousState);
              }}
            >
              <XCircleIcon className="w-8 h-8 text-white" />
            </button>
          </div>
        )}
        <div className="flex flex-col justify-between mt-5">
          <div className="flex flex-col gap-4 text-sm">
            <Link href={"/"}>
              <div
                className={`flex items-center gap-3 py-2 px-1 hover:bg-[#0f5c7b] cursor-pointer ${
                  router.asPath === "/"
                    ? "border-l-4 border-l-orange-400 bg-[#0f5c7b]"
                    : "border-none"
                }`}
                onClick={handleCloseSidebar}
              >
                <HomeIcon className="w-5 h-5 text-white" />
                <span>Home</span>
              </div>
            </Link>

            <Link href={"/projects/"}>
              <div
                className={`flex items-center gap-3 py-2 px-1 hover:bg-[#0f5c7b] cursor-pointer ${
                  router.asPath === "/projects"
                    ? "border-l-4 border-l-orange-400 bg-[#0f5c7b]"
                    : "border-none"
                }`}
                onClick={handleCloseSidebar}
              >
                <FolderIcon className="w-5 h-5 text-white" />
                <span>Projects</span>
              </div>
            </Link>

            <Link href={"/members"}>
              <div
                className={`flex items-center gap-3 py-2 px-1 hover:bg-[#0f5c7b] cursor-pointer ${
                  router.asPath === "/members"
                    ? "border-l-4 border-l-orange-400 bg-[#0f5c7b]"
                    : "border-none"
                }`}
                onClick={handleCloseSidebar}
              >
                <UsersIcon className="w-5 h-5 text-white" />
                <span>Members</span>
              </div>
            </Link>

            <Link href={"/general-settings"}>
              <div
                className={`flex items-center gap-3 py-2 px-1 hover:bg-[#0f5c7b] cursor-pointer ${
                  router.asPath === "/general-settings"
                    ? "border-l-4 border-l-orange-400 bg-[#0f5c7b]"
                    : "border-none"
                }`}
                onClick={handleCloseSidebar}
              >
                <CogIcon className="w-5 h-5 text-white" />
                <span>General Settings</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col  gap-2 text-sm px-3">
        <Link href={"/projects"}>
          <div className="flex items-center gap-3 py-2  px-1 hover:text-blue-500 cursor-pointer">
            <UserAddIcon className="w-5 h-5 text-white" />
            <span>Invite Members</span>
          </div>
        </Link>

        <Link href={"/projects"}>
          <div className="flex items-center gap-3 py-2 px-1 hover:text-blue-500 cursor-pointer">
            <QuestionMarkCircleIcon className="w-5 h-5 text-white" />
            <span>Help & Getting Started</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
