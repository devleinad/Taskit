import React from "react";
import Link from "next/link";

const DashboardCol = ({
  title,
  link,
  icon,
  count,
  iconColor,
  iconBg,
  classes,
}) => {
  return (
    <Link href={link}>
      <div className={classes}>
        <div>
          <button
            type="button"
            className="rounded-full opacity-0.9 text-lg p-4"
            style={{
              color: iconColor,
              backgroundColor: iconBg,
            }}
          >
            {icon}
          </button>
        </div>
        <div>
          <p className="font-semibold text-2xl md:text-lg text-gray-500">
            {title}
          </p>

          <p className="mt-1 text-gray-400 font-semibold text-md text-center px-2 py-1 bg-slate-100 rounded-full">
            {count > 100 ? "100" : count}
            {count > 100 && <span className="font-bold">+</span>}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCol;
