import { PencilIcon, TrashIcon, XCircleIcon } from "@heroicons/react/outline";
import React from "react";
import TaskDescription from "./TaskDescription";

const ShowTaskOverlay = ({ task, hideOverlay, editTask, deleteTask }) => {
  return (
    <div className="fixed top-0 left-0 bg-overlay zindex-1001 w-full h-full flex justify-end overflow-x-hidden">
      <div className="w-full md:overlay-inner-width bg-white p-2 md:p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Task Details</h2>
          <div className="flex space-x-4">
            <button
              type="button"
              className="outline-none"
              onClick={() => editTask(task)}
            >
              <PencilIcon className="w-6 h-6 text-gray-500" />
            </button>
            <button
              type="button"
              className="outline-none"
              onClick={() => deleteTask(task?._id)}
            >
              <TrashIcon className="w-6 h-6 text-gray-500" />
            </button>
            <button
              type="button"
              className="outline-none"
              onClick={hideOverlay}
            >
              <XCircleIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {task && <TaskDescription task={task} />}
      </div>
    </div>
  );
};

export default ShowTaskOverlay;
