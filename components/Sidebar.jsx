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
    <div className="flex flex-col justify-between h-screen  md:overflow-hidden oveflow-auto md:hover:overflow-auto pb-5">
      <div className="px-3">
        {isSidebarOpen && (
          <div className="flex justify-between items-center px-1 mt-2">
            <div className="font-semibold text-2xl">Taskit</div>
            <button
              className="md:hidden text-xl rounded-full hover:bg-light-gray"
              onClick={() => {
                setIsSidebarOpen((previousState) => !previousState);
              }}
            >
              <XCircleIcon className="w-6 h-6" style={{ color: "#03C9D7" }} />
            </button>
          </div>
        )}
        <div className="flex flex-col justify-between mt-5">
          <div className="flex flex-col gap-4 text-sm">
            <Link href={"/"}>
              <div
                className="flex items-center gap-3 py-1 rounded px-1 hover:bg-slate-100 cursor-pointer"
                onClick={handleCloseSidebar}
              >
                <HomeIcon className="w-5 h-5 text-gray-700" />
                <span>Home</span>
              </div>
            </Link>

            <Link href={"/projects/"}>
              <div
                className={`flex items-center gap-3 py-1 rounded px-1 hover:bg-slate-100 cursor-pointer`}
                onClick={handleCloseSidebar}
              >
                <FolderIcon className="w-5 h-5 text-gray-700" />
                <span>Projects</span>
              </div>
            </Link>

            <Link href={"/projects"}>
              <div
                className="flex items-center gap-3 py-1 rounded px-1 hover:bg-slate-100 cursor-pointer"
                onClick={handleCloseSidebar}
              >
                <ClipboardCheckIcon className="w-5 h-5 text-gray-700" />
                <span>Tasks</span>
              </div>
            </Link>

            <Link href={"/projects"}>
              <div
                className="flex items-center gap-3 py-1 rounded px-1 hover:bg-slate-100 cursor-pointer"
                onClick={handleCloseSidebar}
              >
                <UsersIcon className="w-5 h-5 text-gray-700" />
                <span>Members</span>
              </div>
            </Link>

            <Link href={"/projects"}>
              <div
                className="flex items-center gap-3 py-1 rounded px-1 hover:bg-slate-100 cursor-pointer"
                onClick={handleCloseSidebar}
              >
                <CogIcon className="w-5 h-5 text-gray-700" />
                <span>General Settings</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col  gap-2 text-sm px-3">
        <Link href={"/projects"}>
          <div className="flex items-center gap-3 py-1  px-1 hover:text-blue-500 cursor-pointer">
            <UserAddIcon className="w-5 h-5 text-gray-700" />
            <span>Invite Members</span>
          </div>
        </Link>

        <Link href={"/projects"}>
          <div className="flex items-center gap-3 py-1 px-1 hover:text-blue-500 cursor-pointer">
            <QuestionMarkCircleIcon className="w-5 h-5 text-gray-700" />
            <span>Help & Getting Started</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
