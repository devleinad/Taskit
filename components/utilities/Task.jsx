import React, { useState } from "react";
import { EyeIcon, PencilAltIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import moment from "moment";
import { updateTask } from "../../helpers";

const Task = ({
  task,
  changeTitleOrDescription,
  addToDeletableTasksList,
  removeFromDeletableTasksList,
  handleSetTaskDetailsForUpdate,
  showTask,
  handleUpdateTask,
}) => {
  const [isTitleUpdated, setIsTitleUpdated] = useState(false);
  const [isDescriptionUpdated, setIsDescriptionUpdated] = useState(false);
  const router = useRouter();

  const handleUpdateTaskTitleOrDescription = (column) => {
    if (column === "task_title") {
      //   const data = { task_title: task?.task_title };
      if (isTitleUpdated) {
        handleUpdateTask(task?._id, task);
        setIsTitleUpdated(false);
      } else {
        return;
      }
    }

    if (column === "task_description") {
      //   const data = { task_description: task?.task_description };
      if (isDescriptionUpdated) {
        handleUpdateTask(task?._id, task);
        setIsDescriptionUpdated(false);
      } else {
        return;
      }
    }
  };

  return (
    <div
      className="projects-body-grid text-xs md:text-sm font-semibold text-gray-500 border-b 
    border-b-slate-100 last:border-b-0 even:bg-slate-50"
    >
      <div className="project-check-all-body px-2 py-1">
        <input
          type={"checkbox"}
          className="py-1 task-select-box outline-none"
          data-id={task?._id}
          onClick={(e) => {
            if (e.target.checked) {
              addToDeletableTasksList(task?._id);
            } else {
              removeFromDeletableTasksList(task?._id);
            }
          }}
        />
      </div>

      <div className="project-title-body p-1 flex items-center space-x-1">
        {/* <ArrowCircleRightIcon
          className="w-7 h-7 cursor-pointer"
          onClick={() => navigate(task?._id)}
        /> */}
        {/* <div
          className={`w-4 h-4 rounded p-1 ${
            project.repColor === "#ffffff" && "border border-slate-100"
          }`}
          style={{ backgroundColor: project?.repColor }}
        ></div> */}
        <input
          className="py-1 px-1 border-none outline-none text-sm w-full font-normal 
            text-gray-500 focus:bg-slate-100 bg-inherit"
          data-id={task?._id}
          name="task_title"
          value={task.task_title}
          onChange={(e) => {
            setIsTitleUpdated(true);
            changeTitleOrDescription(e);
          }}
          onBlur={() => {
            if (isTitleUpdated) {
              handleUpdateTaskTitleOrDescription("task_title");
            }
          }}
        />
      </div>

      <div className="hidden md:inline-block  p-1">
        <input
          className="py-1  px-1 border-none outline-none text-sm w-full font-normal 
            text-gray-500 focus:bg-slate-100 bg-inherit"
          data-id={task?._id}
          name="task_description"
          value={task?.task_description}
          onChange={(e) => {
            setIsDescriptionUpdated(true);
            changeTitleOrDescription(e);
          }}
          onBlur={() => {
            if (isDescriptionUpdated) {
              handleUpdateTaskTitleOrDescription("task_description");
            }
          }}
        />
      </div>

      <div className="hidden md:flex p-1 md:items-center md:gap-1">
        <span
          className={`w-2 h-2 rounded-full ${
            task?.status === "To be done" && "bg-slate-500"
          } ${task?.status === "doing" && "bg-blue-400"} ${
            task?.status === "Completed" && "bg-green-400"
          }`}
        ></span>
        <span className="text-xs font-normal">{task?.status}</span>
      </div>

      <div className="hidden md:flex p-1 text-center text-xs font-normal">
        {task.dueDate && moment(task?.dueDate).format("DD MMM, YYYY")}
      </div>

      <div className="hidden md:flex p-1 text-center text-xs font-normal">
        {task.updateAt && moment(task?.updateAt).format("DD MMM, YYYY")}
      </div>

      <div className="flex p-1 font-normal items-center gap-1">
        <button
          type="button"
          className="bg-blue-500 px-2 py-1 rounded text-xs font-normal 
            text-white flex justify-center items-center hover:bg-blue-700"
          title="View"
          onClick={() => showTask(task)}
        >
          <EyeIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="bg-green-500  px-2 py-1 rounded text-xs font-normal 
            text-white flex justify-center items-center hover:bg-green-700"
          onClick={() => handleSetTaskDetailsForUpdate(task)}
          title="Edit"
        >
          <PencilAltIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Task;
