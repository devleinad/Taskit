import { FilterIcon, SearchIcon } from "@heroicons/react/outline";
import React from "react";
import { isEmpty } from "../helpers";
import Pagination from "./utilities/Pagination";
import { Project, TrashIcon, XIcon } from "./utilities/Project";

const Projects = ({
  projects,
  isLoading,
  deletableProjectsList,
  initiateProjectDeleteAction,
  projectsSearchTerm,
  isDeletingMultipleSingleCheck,
}) => {
  // we must check to select all projects, and uncheck to remove all selected projects
  const toggleMultipleProjectsDeletion = (e) => {
    if (e.target.checked) {
      setIsDeletingMultipleSingleCheck(true);
      const elements = document.getElementsByClassName("project-select-box");
      for (var i = 0; i < elements.length; i++) {
        elements[i].checked = true;
        const id = elements[i].getAttribute("data-id");
        setDeletableProjectsLists((previousData) => {
          return [...previousData, id];
        });
      }
    } else {
      const elements = document.getElementsByClassName("project-select-box");
      for (var i = 0; i < elements.length; i++) {
        elements[i].checked = false;
        setDeletableProjectsLists([]);
      }
      setIsDeletingMultipleSingleCheck(false);
    }
  };

  // we must set project details for the project to be updated before showing the overlay
  const handleSetProjectDetailsForUpdate = (project) => {
    if (projectToBeShown) {
      hideShownProject();
    }
    setAction("update");
    const { _id, title, description, status, dueDate, repColor } = project;
    setTitle(title);
    setDescription(description);
    setStatus(status);
    setDueDate(dueDate);
    setRepColor(repColor);
    setProjectTobeUpdatedId(_id);
    handleClick("createOrUpdateProjectOverlay");
  };

  return (
    <div className="mt-4 border border-slate-100 overflow-x-auto md:overflow-x-none">
      <div className="flex justify-between items-center px-2 border-b border-b-slate-100 bg-white py-2">
        <div className="flex items-center gap-2 md:gap-6">
          <button
            type="button"
            className="flex justify-center items-center px-2 py-1 border border-slate-100 rounded text-gray-400"
          >
            <FilterIcon className="w-4 h-4 md:w-3 md:h-3" />
            <span className="hidden md:inline-flex text-xs font-semibold">
              Filter
            </span>
          </button>

          {/* <button
                type="button"
                className="flex justify-center items-center px-2 py-1 border border-slate-100 rounded text-gray-400"
              >
                <CollectionIcon className="w-4 h-4 md:w-3 md:h-3" />
                <span className="hidden md:inline-flex text-xs font-semibold">
                  Change view
                </span>
              </button> */}

          <button
            className={`flex items-center outline-none px-2 py-1 rounded border border-slate-100 ${
              deletableProjectsList.length > 0
                ? "bg-red-500 text-white"
                : "bg-slate-100 text-gray-400"
            }`}
            disabled={deletableProjectsList.length === 0 && true}
            onClick={initiateProjectDeleteAction}
          >
            <TrashIcon className="w-4 h-4 md:w-3 md:h-3" />
            <span className="hidden md:inline-flex text-xs font-semibold">
              Delete
            </span>
          </button>
        </div>

        <div className="flex gap-3 items-center  bg-slate-50 px-2 py-1 rounded ">
          <SearchIcon className="w-4 h-4 text-gray-400" />
          <input
            type={"text"}
            value={projectsSearchTerm}
            className="outline-none bg-inherit w-[100px] md:w-fit"
            placeholder="Search..."
            onChange={(e) => setProjectsSearchTerm(e.target.value)}
          />
          {!isEmpty(projectsSearchTerm) && (
            <XIcon
              className="w-4 h-4 cursor-pointer"
              title="Clear"
              onClick={() => setProjectsSearchTerm("")}
            />
          )}
        </div>
      </div>
      <div
        className="projects-header-grid text-xs md:text-sm font-semibold 
          text-gray-500 border-b border-slate-100 bg-white"
      >
        <div className="project-check-all-header p-2">
          <input
            type={"checkbox"}
            onChange={(e) => toggleMultipleProjectsDeletion(e)}
            checked={isDeletingMultipleSingleCheck}
          />
        </div>

        <div className="project-title-header p-2">Project Title</div>

        <div className="hidden md:inline-block project-description-header p-2">
          Description
        </div>

        <div className="hidden md:inline-block project-status-header p-2">
          Status
        </div>

        <div className="hidden md:inline-block project-due-date-header p-2">
          Due date
        </div>

        <div className="hidden md:inline-block project-last-updated-header p-2">
          Udated at
        </div>

        <div className="project-actions-header p-2">Actions</div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center p-2">
          <div className="text-slate-400 font-semibold text-sm py-2">
            Loading projects...
          </div>
        </div>
      )}

      {!isLoading && projects?.length < 1 && (
        <div className="text-center p-2">
          <p className="text-sm text-gray-500">No projects found!</p>
        </div>
      )}

      {!isLoading && projects?.length > 0 && (
        <>
          {projects?.slice(0, projectsSliceLimit).map((project) => (
            <Project
              key={project?._id}
              project={project}
              changeTitleOrDescription={changeTitleOrDescription}
              updateProject={handleUpdateProjectByTitleOrDescription}
              addToDeletableProjectsList={addToDeletableProjectsList}
              removeFromDeletableProjectsList={removeFromDeletableProjectsList}
              handleSetProjectDetailsForUpdate={
                handleSetProjectDetailsForUpdate
              }
              showProject={setProjectToBeShown}
            />
          ))}
        </>
      )}

      {!isLoading && totalUserProjectsCount > itemsPerPage && (
        <div className="flex justify-center">
          <Pagination
            activePage={activePage}
            onChange={getUserProjects}
            totalItemsCount={totalUserProjectsCount}
            itemsCountPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;
