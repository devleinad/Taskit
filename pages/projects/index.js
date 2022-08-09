/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationIcon,
  FilterIcon,
  FolderIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import Layout from "../../components/Layout";
import {
  getAllUserProjects,
  createProject,
  deleteProject,
  isEmpty,
  updateProject,
} from "../../helpers";
import { useContextState } from "../../contexts/ContextProvider";
import CreateOrUpdateProjectOverlay from "../../components/utilities/CreateOrUpdateProjectOverlay";
import { Project } from "../../components/utilities/Project";
import ActionModal from "../../components/utilities/ActionModal";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ShowProjectOverlay from "../../components/utilities/ShowProjectOverlay";
import ActionMessge from "../../components/ActionMessge";
import FilterOptionsOverlay from "../../components/utilities/FilterOptionsOverlay";

const Index = ({ user }) => {
  const { isClicked, handleClick, handleClose } = useContextState();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projectsFilterStatus, setProjectsFilterStatus] = useState("all");
  const [projectsFilterSort, setProjectsFilterSort] = useState("desc");
  const [projectsFilterOrderBy, setProjectsFilterOrderBy] =
    useState("createdAt");
  const [projectsSearchTerm, setProjectsSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalUserProjectsCount, setTotalUserProjectsCount] = useState(null);
  const itemsPerPage = 8;
  const [totalPagesCount, setTotalPagesCount] = useState(null);

  //details for creating projects
  const [isProcessing, setIsProcessing] = useState(false);
  const [action, setAction] = useState("create");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repColor, setRepColor] = useState("#071D90");
  const [status, setStatus] = useState("Active");
  const [dueDate, setDueDate] = useState("");
  const [showActionModal, setShowActionModal] = useState(false);
  const [inputFillError, setInputFillError] = useState("");
  const [deletableProjectsList, setDeletableProjectsLists] = useState([]);
  const [isDeletingMultipleSingleCheck, setIsDeletingMultipleSingleCheck] =
    useState(false);
  const [projectTobeUpdated, setProjectTobeUpdated] = useState(null);
  const [projectToBeShown, setProjectToBeShown] = useState(null);

  const notify = (message, type, position = "bottom-right") =>
    toast(message, { type }, { position });
  const router = useRouter();

  const getUserProjects = (pageNmber = activePage) => {
    getAllUserProjects(
      pageNmber,
      projectsFilterStatus,
      projectsFilterOrderBy,
      projectsFilterSort,
      projectsSearchTerm
    )
      .then((res) => {
        setTotalUserProjectsCount(res.data.totalUserProjectsCount);
        setActivePage(res.data.page);
        setProjects(res.data.projects);
        setTotalPagesCount(
          Math.ceil(res.data.totalUserProjectsCount / itemsPerPage)
        );
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
        notify("Something went wrong!", "error");
      });
  };

  useEffect(() => {
    setError(false);
    getUserProjects();
  }, [
    totalUserProjectsCount,
    activePage,
    projectsFilterStatus,
    projectsFilterSort,
    projectsFilterOrderBy,
    projectsSearchTerm,
  ]);

  // we should be able to update the title and description of a particular project
  const changeTitleOrDescription = (e) => {
    const project_id = e.target.getAttribute("data-id");
    const updatedProjects = projects.map((project) => {
      if (project._id === project_id) {
        return {
          ...project,
          [e.target.name]: e.target.value,
        };
      } else {
        return project;
      }
    });
    setProjects(updatedProjects);
  };

  //create project
  const handleCreateProject = () => {
    const data = {
      title,
      description,
      status,
      dueDate,
      repColor,
    };
    setIsProcessing(true);
    createProject(data)
      .then((res) => {
        if (res.data.success) {
          setProjects((previousData) => {
            return [res.data.project, ...previousData];
          });
          setTotalUserProjectsCount((previousCount) => (previousCount += 1));
          handleClose("createOrUpdateProjectOverlay");
          setIsProcessing(false);
          clearFields();

          notify("Project created successfully!", "success");
        }
      })
      .catch((error) => {
        setIsProcessing(false);
        if (error) {
          switch (error.response.status) {
            case 422:
              setInputFillError("The project title field is required!");
              break;
            case 423:
              setInputFillError(
                "Duplicate! You already have a project with the same title."
              );
              break;
            case 501 || 500:
              notify("Something went wrong!", "error");
              break;
            case 401:
              router.push("/login");
          }
        }
      });
  };

  // update project title or description from list
  const handleUpdateProjectFromList = (projectId, project) => {
    setIsProcessing(true);
    updateProject(`/api/projects/${projectId}/`, project)
      .then((res) => {
        if (res.status === 201) {
          const returnedProject = res.data.updatedProject;

          setProjects((currentProjects) => {
            const updatedProjects = currentProjects.map((project) => {
              if (project._id === returnedProject._id) {
                return {
                  ...project,
                  title: returnedProject.title,
                  repColor: returnedProject.repColor,
                  status: returnedProject.status,
                  description: returnedProject.description,
                  dueDate: returnedProject.dueDate,
                  updatedAt: returnedProject.updatedAt,
                };
              } else {
                return project;
              }
            });

            return updatedProjects;
          });
        }
      })
      .catch((error) => {
        setIsProcessing(false);
        if (error) {
          switch (error.response.status) {
            case 422:
              setInputFillError("The project title field is required!");
              break;
            case 423:
              setInputFillError(
                "Duplicate! You already have a project with the same title."
              );
              break;
            case 501 || 500:
              notify("Something went wrong!", "error");
              break;
            case 401:
              router.push("/login");
          }
        }
      });
  };

  function handleUpdateProjectFromForm() {
    const data = {
      _id: projectTobeUpdated,
      title,
      description,
      status,
      dueDate,
      repColor,
    };

    setIsProcessing(true);

    updateProject(`/api/projects/${projectTobeUpdated}/`, data)
      .then((res) => {
        if (res.status === 201) {
          const returnedProject = res.data.updatedProject;

          setProjects((currentProjects) => {
            const updatedProjects = currentProjects.map((project) => {
              if (project._id === returnedProject._id) {
                return {
                  ...project,
                  title: returnedProject.title,
                  repColor: returnedProject.repColor,
                  status: returnedProject.status,
                  description: returnedProject.description,
                  dueDate: returnedProject.dueDate,
                  updatedAt: returnedProject.updatedAt,
                };
              } else {
                return project;
              }
            });

            return updatedProjects;
          });

          handleClose("createOrUpdateProjectOverlay");
          setIsProcessing(false);
          notify("Project updated successfully!", "success");
          clearFields();
        }
      })
      .catch((error) => {
        setIsProcessing(false);
        if (error) {
          switch (error.response.status) {
            case 422:
              setInputFillError("The project title field is required!");
              break;
            case 423:
              setInputFillError(
                "Duplicate! You already have a project with the same title."
              );
              break;
            case 501 || 500:
              notify("Something went wrong!", "error");
              break;
            case 401:
              router.push("/login");
          }
        }
      });
  }

  const handleDeleteProject = () => {
    deleteProject({ projects: deletableProjectsList })
      .then((res) => {
        if (res.status === 201) {
          setTotalUserProjectsCount((previousCount) => {
            return previousCount - deletableProjectsList.length;
          });
          const filteredData = projects.filter(
            (project) => false === deletableProjectsList.includes(project._id)
          );
          setProjects(filteredData);
          setDeletableProjectsLists([]);
          if (isDeletingMultipleSingleCheck) {
            setIsDeletingMultipleSingleCheck(false);
          }

          setShowActionModal(false);
          notify("Project deleted successfully!", "success");
        }
      })
      .catch(() => {
        if (error) {
          switch (error.response.status) {
            case 422:
              setInputFillError("The project title field is required!");
              break;
            case 423:
              setInputFillError(
                "Duplicate! You already have a project with the same title."
              );
              break;
            case 501 || 500:
              notify("Project deletion failed!", "error");
              break;
            case 401:
              router.push("/login");
          }
        }
      });
  };

  //clear fields when
  const clearFields = () => {
    setTitle("");
    setRepColor("#071D90");
    setStatus("Active");
    setDueDate("");
    setDescription("");
    setInputFillError("");
    setError(false);
    setAction("create");
    setProjectTobeUpdated(null);
  };

  const initiateProjectDeleteAction = () => {
    setShowActionModal(true);
  };

  //cancel delete action
  const cancelDeleteAction = () => {
    const elements = document.getElementsByClassName("project-select-box");
    for (var i = 0; i < elements.length; i++) {
      elements[i].checked = false;
      setDeletableProjectsLists([]);
    }
    setIsDeletingMultipleSingleCheck(false);
    setShowActionModal(false);
  };

  // add a project to the list of selected projects to be deleted
  const addToDeletableProjectsList = (id) => {
    setDeletableProjectsLists((previousList) => {
      return [...previousList, id];
    });
  };

  // remove a project from the list of selected projects to be deleted
  const removeFromDeletableProjectsList = (id) => {
    const filteredProjects = deletableProjectsList.filter(
      (value) => value !== id
    );
    setDeletableProjectsLists(filteredProjects);
  };

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
    setProjectTobeUpdated(_id);
    handleClick("createOrUpdateProjectOverlay");
  };

  //we should be able to hide the project decription overlay if it is showing
  const hideShownProject = () => {
    setProjectToBeShown(null);
  };

  const deleteProjectFromDescription = (project_id) => {
    if (projectToBeShown) {
      setProjectToBeShown(null);
    }

    addToDeletableProjectsList(project_id);
    initiateProjectDeleteAction();
  };

  const projectDeletionWarningMessage = (
    <ActionMessge
      message={
        <>
          <p>
            Are you sure you want to delete{" "}
            {deletableProjectsList.length > 1
              ? "these projects?"
              : "this project?"}{" "}
            Please remeber this action cannot be undone.
          </p>
          <p>
            Click &quot;Delete&quot; to proceed with this action, or
            &quot;Cancel&quot; to cancel this action.
          </p>
        </>
      }
    />
  );

  function navigate(url) {
    router.push(url);
  }

  const handleLoadNextPageContent = function () {
    setActivePage((previousActivePage) => Number(previousActivePage) + 1);
  };

  const handleLoadPreviousPageContent = function () {
    setActivePage((previousActivePage) => Number(previousActivePage) - 1);
  };

  if (error) throw new Error("Some thing went wrong");

  return (
    <React.Fragment>
      <Head>
        <title>Taskit - Projects</title>
        <meta
          name="description"
          content="Your #1 platform for project and task management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout user={user && user}>
        {showActionModal && (
          <ActionModal
            title={"Delete Project"}
            warningMessage={projectDeletionWarningMessage}
            customCancelFunc={cancelDeleteAction}
            customActionFunc={handleDeleteProject}
            icon={<ExclamationIcon className="w-20 h-20 text-red-500" />}
          />
        )}

        {projectToBeShown && (
          <ShowProjectOverlay
            project={projectToBeShown}
            hideOverlay={hideShownProject}
            editProject={handleSetProjectDetailsForUpdate}
            deleteProject={deleteProjectFromDescription}
          />
        )}

        {isClicked.showFilterOptionsOverlay && (
          <FilterOptionsOverlay
            type={"projects"}
            close={() => handleClose("showFilterOptionsOverlay")}
            projectsFilterStatus={projectsFilterStatus}
            projectsFilterSort={projectsFilterSort}
            projectsFilterOrderBy={projectsFilterOrderBy}
            setProjectsFilterStatus={setProjectsFilterStatus}
            setProjectsFilterOrderBy={setProjectsFilterOrderBy}
            setProjectsFilterSort={setProjectsFilterSort}
          />
        )}

        <div className="relative flex flex-col bg-white p-3">
          <div className="flex items-center space-x-2">
            <FolderIcon className="w-8 h-8" />{" "}
            <span className=" text-2xl font-semibold">Projects</span>
          </div>

          <div className="flex items-center space-x-2">
            <div
              className="text-sm text-gray-400 hover:text-blue-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </div>

            <ChevronRightIcon className="w-3 h-3" />

            <div className="text-sm text-black">Projects</div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full p-3 border-t border-t-slate-50 border-b border-b-slate-50">
          <p className="text-gray-500 text-lg font-semibold">
            Projects Total {!isLoading && `(${totalUserProjectsCount})`}
          </p>
          <button
            type="button"
            className="p-2 md:p-3 bg-blue-800 rounded text-white text-sm font-semibold flex items-center justify-center  transition duration-50 hover:bg-blue-600 hover:drop-shadow-lg"
            onClick={() => {
              setAction("create");
              handleClick("createOrUpdateProjectOverlay");
            }}
          >
            <PlusIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span>
              Add <span className="hidden md:inline"> Project</span>
            </span>
          </button>
        </div>

        {isClicked.createOrUpdateProjectOverlay && (
          <CreateOrUpdateProjectOverlay
            action={action}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            repColor={repColor}
            setRepColor={setRepColor}
            status={status}
            setStatus={setStatus}
            dueDate={dueDate}
            setDueDate={setDueDate}
            handleClose={handleClose}
            clearFields={clearFields}
            createProject={handleCreateProject}
            updateProject={handleUpdateProjectFromForm}
            isProcessing={isProcessing}
            inputFillError={inputFillError}
          />
        )}

        <div className="p-3">
          <div className="border border-slate-100 overflow-x-auto md:overflow-x-none bg-white">
            <div className="flex justify-between items-center px-2 border-b border-b-slate-100 py-2">
              <div className="flex items-center gap-2 md:gap-6">
                <button
                  type="button"
                  className="flex justify-center items-center space-x-2 px-2 py-1 border border-slate-100 rounded text-gray-400"
                  onClick={() => handleClick("showFilterOptionsOverlay")}
                >
                  <FilterIcon className="w-4 h-4" />
                  <span className="hidden md:inline-flex text-xs font-semibold">
                    Filter
                  </span>
                </button>

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

              <div className="flex gap-3 items-center  bg-slate-50 px-2 py-1 rounded">
                <SearchIcon className="w-4 h-4 text-gray-400" />
                <input
                  type={"text"}
                  value={projectsSearchTerm}
                  className="outline-none bg-inherit w-[100px] md:w-[170px]"
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
          text-gray-500 border-b border-b-slate-100"
            >
              <div className="project-check-all-header px-2 py-4 flex justify-center items-center">
                <input
                  type={"checkbox"}
                  onChange={(e) => toggleMultipleProjectsDeletion(e)}
                  checked={isDeletingMultipleSingleCheck}
                />
              </div>

              <div className="project-title-header px-2 py-4 flex text-md">
                Project Title
              </div>

              <div className="hidden md:inline project-description-header px-2 py-4 text-md">
                Description
              </div>

              <div className="hidden md:inline project-status-header px-2 py-4 text-md">
                Status
              </div>

              <div className="hidden md:inline project-due-date-header px-2 py-4 text-md">
                Due date
              </div>

              <div className="hidden md:inline project-last-updated-header px-2 py-4 text-md">
                Updated at
              </div>

              <div className="project-actions-header px-2 py-4 text-center text-md">
                Actions
              </div>
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
                {projects?.map((project) => (
                  <Project
                    key={project?._id}
                    project={project}
                    changeTitleOrDescription={changeTitleOrDescription}
                    updateProject={handleUpdateProjectFromList}
                    addToDeletableProjectsList={addToDeletableProjectsList}
                    removeFromDeletableProjectsList={
                      removeFromDeletableProjectsList
                    }
                    handleSetProjectDetailsForUpdate={
                      handleSetProjectDetailsForUpdate
                    }
                    showProject={setProjectToBeShown}
                  />
                ))}
              </>
            )}

            {!isLoading && (
              <div className="flex justify-between items-center py-4 px-2">
                {totalPagesCount > 1 && (
                  <p className="text-xs md:text-md text-gray-500 font-normal">
                    Showing page {activePage} / {totalPagesCount}
                  </p>
                )}
                {totalUserProjectsCount > itemsPerPage && (
                  <div className="flex justify-center items-center border rounded">
                    <button
                      className={`px-2 py-1 md:px-3 md:py-2 text-sm md:text-md font-normal text-gray-500 flex items-center justify-center space-x-2`}
                      onClick={handleLoadPreviousPageContent}
                      disabled={Number(activePage) === 1}
                    >
                      <ChevronLeftIcon className="w-4 h-4" /> Previous
                    </button>

                    <button
                      className="px-2 py-1 md:px-3 md:py-2 text-sm md:text-md font-normal text-gray-500 flex items-center justify-center space-x-2"
                      onClick={handleLoadNextPageContent}
                      disabled={
                        Number(totalPagesCount) === 1 ||
                        Number(activePage) === totalPagesCount
                      }
                    >
                      Next <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: { user: session?.user },
    };
  }
};

export default Index;
