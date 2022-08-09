/* eslint-disable @next/next/no-img-element */
import {
  ArrowRightIcon,
  PencilAltIcon,
  PlusIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import Charvatar from "./Charvatar";
import { isEmpty, updateTask } from "../../helpers";

const CreateOrUpdateTaskOverlay = ({
  action,
  user,
  repColor,
  project_title,
  close,
  task_title,
  setTaskTitle,
  task_description,
  setTaskDescription,
  status,
  setStatus,
  attachments,
  setAttachments,
  dueDate,
  setDueDate,
  assignees,
  setAssignees,
  clearFields,
  createTask,
  updateTask,
  isProcessing,
}) => {
  // const [step, setStep] = useState(1);

  const handleSelect = (e) => {
    setAssignees(Array.from(e.target.selectedOptions, (item) => item.value));
  };

  let finishBtn;
  if (!isEmpty(task_title)) {
    finishBtn = (
      <button
        type="button"
        className="px-4 py-2 rounded-full bg-blue-500 text-md font-semibold text-white 
        hover:bg-blue-700 shadow-lg"
        disabled={isProcessing}
        onClick={() => {
          if (action === "create") {
            createTask();
          } else {
            updateTask();
          }
        }}
      >
        {isProcessing
          ? "processing..."
          : action === "create"
          ? "CREATE"
          : "UPDATE"}
      </button>
    );
  } else {
    finishBtn = (
      <button
        type="button"
        className="px-4 py-2 rounded-full bg-slate-200 text-md font-semibold text-gray-500"
        disabled
      >
        FINISH
      </button>
    );
  }

  function handleClose() {
    if (
      action === "create" &&
      (!isEmpty(task_title) ||
        !isEmpty(task_description) ||
        !isEmpty(dueDate) ||
        assignees.length > 0)
    ) {
      if (
        confirm(
          "Are you sure you want to cancel this process? NB: All provided information will be lost."
        )
      ) {
        close();
        clearFields();
      }
    } else {
      close();
    }
  }
  return (
    <div className="absolute right-0 bottom-0 shadow-md p-4 w-full md:w-[500px] border border-slate-50 bg-white h-screen overflow-y-auto">
      <div className="flex justify-between items-center">
        {action === "create" && (
          <div className="flex space-x-2 items-center">
            <PlusIcon className="w-5 h-5" />
            <span className="text-lg font-bold">Create a task</span>
          </div>
        )}

        {action === "update" && (
          <div className="flex space-x-2 items-center">
            <PencilAltIcon className="w-5 h-5" />
            <span className="text-lg font-bold">Edit task</span>
          </div>
        )}

        <XCircleIcon
          className="w-7 h-7 cursor-pointer text-gray-500"
          onClick={handleClose}
        />
      </div>

      <div className="mt-3">
        <div>
          <p className="text-md font-semibold">Assigned by</p>
          <div className="flex space-x-1 items-center mt-1">
            {user?.avatar ? (
              <img
                src={`user?.avatar`}
                className="w-4 h-4 rounded-full"
                alt={user?.avatar}
              />
            ) : (
              <Charvatar
                width={22}
                height={22}
                text={user?.name}
                fontSize={9}
                color="#ffffff"
                borderRadius={"50%"}
              />
            )}
            <span className="text-sm font-semibold text-gray-500">
              {user?.name}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-md font-semibold">Assigned to</p>
          <select
            className="p-2 outline-none border border-slate-100 rounded w-full h-fit mt-1"
            value={assignees}
            multiple
            onChange={(e) => handleSelect(e)}
          >
            <option value={user?._id}>{user?.name}</option>
            <option value={"devleinad"}>Dev Leinad</option>
          </select>
        </div>

        <div className="mt-4">
          <p className="text-md font-semibold">Project</p>
          <div
            className={`p-2 bg-slate-100 text-gray-500 text-md mt-1`}
            style={{ borderLeft: `5px solid ${repColor}` }}
          >
            {project_title}
          </div>

          <div className="mt-4">
            <p className="text-md font-semibold">Task title</p>
            <input
              type={"text"}
              value={task_title}
              className="p-2 border border-slate-100 rounded outline-none focus:border-blue-200 w-full mt-1"
              placeholder="Feed the cat"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <p className="text-md font-semibold">Task description (optional)</p>
            <textarea
              rows={2}
              className="border border-slate-200 rounded p-2 outline-none hover:border-blue-200 w-full mt-1"
              name="task_description"
              value={task_description}
              placeholder="Give the cat some milk"
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center gap-2 md:gap-4">
              <div className="flex flex-col w-1/2">
                <p className="text-md font-semibold">Task status</p>
                <select
                  className="p-2 outline-none border border-slate-100 rounded w-full h-fit mt-1"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={"To be done"}>To be done</option>
                  <option value={"Doing"}>Doing</option>
                  <option value={"Completed"}>Completed</option>
                </select>
              </div>

              <div className="flex flex-col w-1/2">
                <p className="text-md font-semibold">Deadline/Due date</p>
                <input
                  type={"date"}
                  value={dueDate}
                  className="p-2 border border-slate-100 mt-1 rounded outline-none focus:border-blue-200 w-full"
                  placeholder="Feed the cat"
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-center items-center">
                {finishBtn}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrUpdateTaskOverlay;
