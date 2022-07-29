import {
  BellIcon,
  ClipboardCheckIcon,
  CogIcon,
  FolderIcon,
  UsersIcon,
} from "@heroicons/react/outline";

export const mainData = [
  {
    title: "Projects",
    icon: <FolderIcon className="w-8 h-8" />,
    iconColor: "#ffffff",
    iconBg: "#398acc",
    count: 20,
    link: "/projects",
  },
  {
    title: "Tasks",
    icon: <ClipboardCheckIcon className="w-8 h-8" />,
    iconColor: "#ffffff",
    iconBg: "#e95656",
    count: 101,
    link: "/tasks/",
  },
  {
    title: "Members",
    icon: <UsersIcon className="w-8 h-8" />,
    iconColor: "#ffffff",
    iconBg: "green",
    count: 10,
    link: "/members/",
  },

  {
    title: "Notifications",
    icon: <BellIcon className="w-8 h-8" />,
    iconColor: "#ffffff",
    iconBg: "orange",
    count: 10,
    link: "/notifications/",
  },
];
