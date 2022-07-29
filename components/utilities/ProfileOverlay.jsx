/* eslint-disable @next/next/no-img-element */
import {
  BellIcon,
  ChatIcon,
  LogoutIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import React from "react";
import Charvatar from "./Charvatar";

const ProfileOverlay = ({ closeOverlay, user, signout }) => {
  return (
    <div
      className="absolute bg-white w-full md:w-1/5 rounded shadow-xl p-2 h-fit md:right-5 top-14"
      style={{ zIndex: 95 }}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-slate-500">Profile</h4>
        <button type="button" className="outline-none" onClick={closeOverlay}>
          <XCircleIcon className="w-7 h-7 text-slate-500" />
        </button>
      </div>

      <div className="mt-3">
        <div className="flex items-start gap-2  border-b-2 border-b-slate-100 pb-3">
          <div className="w-auto">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                className="w-9 h-9 rounded"
                alt="User profile"
              />
            ) : (
              <Charvatar
                text={user?.name}
                width={70}
                height={70}
                fontSize={"20px"}
                color="#ffffff"
                borderRadius="5px"
              />
            )}
          </div>

          <div className="flex flex-col gap-0">
            <p className="font-semibold text-md">{user?.name}</p>
            <p className="text-xs text-gray-400 font-semibold">{user?.email}</p>
            {user?.companyName && (
              <p className="font-semibold text-xs text-gray-400">
                {user?.companyName}
              </p>
            )}
          </div>
        </div>

        <div className="mt-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-b-slate-100 pb-3 cursor-pointer">
              <div className="items-center bg-slate-50 p-1 rounded">
                <UserIcon className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-sm font-semibold">My Profile</p>
                <small className="font-semibold text-xs text-gray-400">
                  Account Settings
                </small>
              </div>
            </div>

            <div className="flex items-center gap-2  border-b border-b-slate-100 pb-3 cursor-pointer">
              <div className=" bg-cyan-50 items-center p-1 rounded">
                <BellIcon className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-sm font-semibold">Notifications</p>
                <small className="font-semibold text-xs text-gray-400">
                  Read & unread notifications
                </small>
              </div>
            </div>

            <div className="flex items-center gap-2  border-b border-b-slate-100 pb-3 cursor-pointer">
              <div className="bg-blue-50 items-center p-1 rounded">
                <ChatIcon className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-sm font-semibold">My Inbox</p>
                <small className="font-semibold text-xs text-gray-400">
                  Read & unread messages
                </small>
              </div>
            </div>

            <div
              className="flex items-center gap-2  border-b border-b-slate-100 pb-3 cursor-pointer"
              onClick={signout}
            >
              <div className="bg-red-50 items-center p-1 rounded">
                <LogoutIcon className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-sm font-semibold text-red-300">Logout</p>
                <small className="font-semibold text-xs text-gray-400">
                  Exit app
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverlay;
