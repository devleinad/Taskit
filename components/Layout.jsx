import React, { useEffect, useRef } from "react";
import { useContextState } from "../contexts/ContextProvider";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import {
  AddOverlay,
  NotificationOverlay,
  ChatOverlay,
  ProfileOverlay,
} from "./utilities";
import { signOut } from "next-auth/react";

function Layout({ user, children }) {
  const { isSidebarOpen, isClicked, handleClose } = useContextState();

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="pb-10 md:pb-0">
        {isSidebarOpen && (
          <div
            className="fixed min-h-screen bg-[#004F6D] px-0 sidebar"
            style={{ zIndex: 100 }}
          >
            <Sidebar />
          </div>
        )}
        <div
          className={`min-h-screen ${isSidebarOpen ? "md:ml-230" : "flex-2"}`}
        >
          <Navbar user={user} />
          <div>
            {isClicked.addOverlay && <AddOverlay />}
            {isClicked.notificationOverlay && <NotificationOverlay />}
            {isClicked.chatOverlay && <ChatOverlay />}
            {isClicked.profileOverlay && (
              <ProfileOverlay
                user={user}
                closeOverlay={() => handleClose("profileOverlay")}
                signout={() => signOut()}
              />
            )}
          </div>
          <main style={{ zIndex: 90 }}>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Layout;
