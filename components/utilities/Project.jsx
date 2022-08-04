/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useState } from "react";
import {
  ArrowCircleRightIcon,
  EyeIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

export const Project = ({
  project,
  updateProject,
  addToDeletableProjectsList,
  removeFromDeletableProjectsList,
  handleSetProjectDetailsForUpdate,
  changeTitleOrDescription,
  showProject,
}) => {
  const [isTitleUpdated, setIsTitleUpdated] = useState(false);
  const [isDescriptionUpdated, setIsDescriptionUpdated] = useState(false);
  const router = useRouter();

  const handleUpdateProjectTitleOrDescription = (column) => {
    if (column === "title") {
      if (isTitleUpdated) {
        updateProject(project?._id, project);
        setIsTitleUpdated(false);
      } else {
        return;
      }
    }

    if (column === "description") {
      if (isDescriptionUpdated) {
        updateProject(project?._id, project);
        setIsDescriptionUpdated(false);
      } else {
        return;
      }
    }
  };

  const navigate = (project_id) => {
    router.push(`/project/${project_id}/tasks`);
  };

  return (
    <div
      className="projects-body-grid text-xs md:text-sm font-semibold text-gray-500 border-b 
    border-b-slate-100 last:border-b-0 even:bg-slate-50"
    >
      <div className="project-check-all-body px-2 py-1">
        <input
          type={"checkbox"}
          className="py-1 project-select-box outline-none"
          data-id={project?._id}
          onClick={(e) => {
            if (e.target.checked) {
              addToDeletableProjectsList(project?._id);
            } else {
              removeFromDeletableProjectsList(project?._id);
            }
          }}
        />
      </div>

      {/* <div className='p-1 flex items-center space-x-1'>
            {
              project?.creator?.avatar ? (
                <img src={project?.creator?.avatar} className="w-6 h-6 rounded-fulll" alt='Profile photo'/>
              ):
              <Charvatar 
              text={project?.creator?.fullName} 
              width={27} 
              height={27} 
              color={'#ffffff'} 
              fontSize={'11px'}
              />
            }
        </div> */}

      <div className="project-title-body p-1 flex items-center space-x-1">
        <ArrowCircleRightIcon
          className="w-7 h-7 md:w-5 md:h-5 cursor-pointer"
          onClick={() => navigate(project?._id)}
        />
        <div
          className={`w-4 h-4 rounded p-1 ${
            project.repColor === "#ffffff" && "border border-slate-100"
          }`}
          style={{ backgroundColor: project?.repColor }}
        ></div>
        <input
          className="py-1 px-1 border-none outline-none text-sm w-full font-normal 
            text-gray-500 focus:bg-slate-100 bg-inherit"
          data-id={project?._id}
          name="title"
          value={project.title}
          onChange={(e) => {
            setIsTitleUpdated(true);
            changeTitleOrDescription(e);
          }}
          onBlur={() => {
            if (isTitleUpdated) {
              handleUpdateProjectTitleOrDescription("title");
            }
          }}
        />
      </div>

      <div className="hidden md:inline-block  p-1">
        <input
          className="py-1  px-1 border-none outline-none text-sm w-full font-normal 
            text-gray-500 focus:bg-slate-100 bg-inherit"
          data-id={project?._id}
          name="description"
          value={project?.description}
          onChange={(e) => {
            setIsDescriptionUpdated(true);
            changeTitleOrDescription(e);
          }}
          onBlur={() => {
            if (isDescriptionUpdated) {
              handleUpdateProjectTitleOrDescription("description");
            }
          }}
        />
      </div>

      <div className="hidden md:flex p-1 md:items-center md:gap-1">
        <span
          className={`w-2 h-2 rounded-full ${
            project?.status === "Active" ? "bg-blue-400" : "bg-green-400"
          }`}
        ></span>
        <span className="text-xs font-normal">{project?.status}</span>
      </div>

      <div className="hidden md:flex p-1 text-center text-xs font-normal">
        {project.dueDate && moment(project?.dueDate).format("DD MMM, YYYY")}
      </div>

      <div className="hidden md:flex p-1 text-center text-xs font-normal">
        {project.updateAt && moment(project?.updateAt).format("DD MMM, YYYY")}
      </div>

      <div className="flex p-1 font-normal items-center gap-1">
        <button
          type="button"
          className="bg-blue-500 px-2 py-1 rounded text-xs font-normal 
            text-white flex justify-center items-center hover:bg-blue-700"
          title="View"
          onClick={() => showProject(project)}
        >
          <EyeIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          className="bg-green-500  px-2 py-1 rounded text-xs font-normal 
            text-white flex justify-center items-center hover:bg-green-700"
          onClick={() => handleSetProjectDetailsForUpdate(project)}
          title="Edit"
        >
          <PencilAltIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
