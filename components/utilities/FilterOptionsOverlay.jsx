import { FilterIcon, XIcon } from "@heroicons/react/outline";
import React from "react";

const FilterOptionsOverlay = ({
  type,
  close,
  projectsFilterStatus,
  setProjectsFilterStatus,
  projectsFilterSort,
  setProjectsFilterSort,
  projectsFilterOrderBy,
  setProjectsFilterOrderBy,
  tasksFilterStatus,
  setTasksFilterStatus,
  tasksFilterSort,
  setTasksFilterSort,
  tasksFilterOrderBy,
  setTasksFilterOrderBy,
}) => {
  return (
    <div
      className="fixed top-0 left-0 bg-overlay zindex-1001 w-full h-full flex items-center 
    justify-center overflow-x-hidden px-3"
    >
      <div className="w-full md:w-[300px] bg-white px-3 py-4 md:p-6 rounded">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 items-center">
            <FilterIcon className="w-5 h-5" />
            <p className="text-lg font-semibold md:font-bold">Filter Options</p>
          </div>
          <XIcon
            className="w-6 h-6 cursor-pointer text-gray-500"
            onClick={close}
          />
        </div>
        <div className="mt-2">
          {type === "projects" ? (
            <div className="flex flex-col">
              <>
                <p>Order by</p>

                <select
                  className="px-3 py-2 border rounded outline-none w-full"
                  value={projectsFilterOrderBy}
                  onChange={(e) => setProjectsFilterOrderBy(e.target.value)}
                >
                  <option value="project_title">Project title</option>

                  <option value="createdAt">Date created</option>
                  <option value="updatedAt">Date updated</option>
                </select>
              </>
              <div className="mt-4">
                <p>Sort</p>
                <select
                  className="px-3 py-2 border rounded outline-none w-full"
                  value={projectsFilterSort}
                  onChange={(e) => setProjectsFilterSort(e.target.value)}
                >
                  <option value="asc">Old to New (Ascending)</option>
                  <option value="desc">New to Old (Descending)</option>
                </select>
              </div>
              <div className="mt-4">
                <p>Status</p>
                <select
                  className="px-3 py-2 border rounded outline-none w-full"
                  value={projectsFilterStatus}
                  onChange={(e) => setProjectsFilterStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="all">Both Active and Completed</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <>
                <p>Order by</p>

                <select
                  className="px-3 py-2 border rounded outline-none w-full"
                  value={tasksFilterOrderBy}
                  onChange={(e) => setTasksFilterOrderBy(e.target.value)}
                >
                  <option value="task_title">Task title</option>

                  <option value="createdAt">Date created</option>
                  <option value="updatedAt">Date updated</option>
                </select>
              </>
              <div className="mt-4">
                <p>Sort</p>
                <select
                  className="px-3 py-2 border rounded outline-none w-full"
                  value={tasksFilterSort}
                  onChange={(e) => setTasksFilterSort(e.target.value)}
                >
                  <option value="asc">Old to New (Ascending)</option>
                  <option value="desc">New to Old (Descending)</option>
                </select>
              </div>
              <div className="mt-4">
                <p>Status</p>
                <select
                  className="px-3 py-2 border rounded outline-none w-full"
                  value={tasksFilterStatus}
                  onChange={(e) => setTasksFilterStatus(e.target.value)}
                >
                  <option value="To be done">To be done</option>
                  <option value="Doing">Doing</option>
                  <option value="Completed">Completed</option>
                  <option value={"all"}>All</option>
                </select>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg font-semibold"
              onClick={() => close()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOptionsOverlay;
