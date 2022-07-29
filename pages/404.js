import { ExclamationIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div
      className="flex flex-col items-center justify-center mx-auto"
      style={{ minHeight: "100vh" }}
    >
      <div className="max-w-sm p-4 bg-white rounded border flex flex-col items-center justify-center">
        <ExclamationIcon className="w-10 h-10 text-red-500" />
        <h1 className="font-semibold">Oops! Something is wrong.</h1>
        <p className="text-sm text-gray-500">
          It appears the page you are looking for could not be found. Please
          double-check the address.
        </p>
        <Link href="/">
          <button className="text-sm mt-4 text-gray-500 font-semibold p-2 border rounded">
            Go back home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
