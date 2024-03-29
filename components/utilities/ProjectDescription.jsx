import React from "react";
import Charvatar from "./Charvatar";
import { PaperClipIcon } from "@heroicons/react/outline";
import moment from "moment";

const ProjectDescription = ({ project }) => {
  return (
    <div className="relative mt-3">
      <dl>
        <div className="px-4 py-5 flex space-x-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Title</dt>
          <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
            {project?.title}
          </dd>
        </div>

        <div className="even:bg-gray-50  px-4 py-5 flex space-x-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">
            Representing color
          </dt>
          <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <div
              className={`h-5 w-5 rounded ${
                project?.repColor === "#000000" &&
                "border dark:border-slate-700"
              }`}
              style={{ backgroundColor: `${project?.repColor}` }}
            ></div>
          </dd>
        </div>

        <div className=" px-4 py-5 flex space-x-4 items-center sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Created by</dt>
          <dd className="flex items-center space-x-1">
            <Charvatar
              text={project?.creator?.fullName}
              width={30}
              height={30}
              borderRadius={"50%"}
              fontSize={12}
            />
            <span className="text-sm text-gray-500">
              {project?.creator?.fullName}
            </span>
          </dd>
        </div>

        <div className="bg-gray-50 px-4 py-5 flex space-x-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Status</dt>
          <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {project?.status}
          </dd>
        </div>

        <div className="px-4 py-5 flex space-x-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500 cols-1">
            Description
          </dt>
          <dd className="text-sm text-gray-900 sm:mt-0 cols-3">
            {project?.description}
          </dd>
        </div>

        <div className="even:bg-gray-50  px-4 py-5 flex space-x-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Due date</dt>
          <dd className="text-sm text-gray-900 sm:mt-0">
            {project.dueDate === new Date().toDateString()
              ? "Today"
              : project?.dueDate}
          </dd>
        </div>

        <div className="px-4 py-5 flex space-x-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Created at</dt>
          <dd className="text-sm text-gray-900 sm:mt-0">
            {project?.createdAt
              ? moment(project?.createdAt).format("MMM DD, YYYY")
              : ""}
          </dd>
        </div>

        <div className="even:bg-gray-50  px-4 py-5 flex space-x-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Updated at</dt>
          <dd className="text-sm text-gray-900 sm:mt-0">
            {project.updateAt && project?.createdAt !== project?.updateAt ? (
              moment(project?.updateAt).format("MMM DD, YYYY")
            ) : (
              <i>Not yet</i>
            )}
          </dd>
        </div>

        {/* <div className="px-4 py-5 flex space-x-4 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Attachments</dt>
          <dd className="text-sm text-gray-900 sm:mt-0 w-full">
            <ul
              role="list"
              className="border bg-white  border-gray-200 dark:border-slate-700 rounded-md divide-y divide-gray-200 dark:divide-slate-700"
            >
              <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div className="w-0 flex-1 flex items-center">
                  <PaperClipIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-yellow-600"
                    aria-hidden="true"
                  />
                  <span className="ml-2 flex-1 w-0 truncate">
                    resume_back_end_developer.pdf
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:hover:text-yellow-500"
                  >
                    Download
                  </a>
                </div>
              </li>
              <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div className="w-0 flex-1 flex items-center">
                  <PaperClipIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-yellow-600"
                    aria-hidden="true"
                  />
                  <span className="ml-2 flex-1 w-0 truncate">
                    cover_letter_back_end_developer.pdf
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500 dark:hover:text-yellow-500"
                  >
                    Download
                  </a>
                </div>
              </li>
            </ul>
          </dd>
        </div> */}
      </dl>
    </div>
  );
};

export default ProjectDescription;
