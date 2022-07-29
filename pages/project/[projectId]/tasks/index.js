import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession } from "next-auth/react";
import Layout from "../../../../../components/Layout";
import Head from "next/head";
import {
  ChevronRightIcon,
  ExclamationIcon,
  FilterIcon,
  FolderIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";

import CreateOrUpdateTaskOverlay from "../../../../../components/utilities/CreateOrUpdateTaskOverlay";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  isEmpty,
  updateTask,
  deleteTask,
  createTask,
} from "../../../../helpers";
import Task from "../../../../components/utilities/Task";
import ActionMessge from "../../../../components/ActionMessge";
import ShowTaskOverlay from "../../../../components/utilities/ShowTaskOverlay";
import ActionModal from "../../../../components/utilities/ActionModal";
import { useContextState } from "../../../../contexts/ContextProvider";

const Index = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { projectId } = router.query;
  const { isClicked, handleClick, handleClose } = useContextState();
  const [tasksQueryStatus, setTasksQueryStatus] = useState("all");
  const [tasksQuerySort, setTasksQuerySort] = useState("asc");
  const [tasksSortBy, setTasksSortBy] = useState("createdAt");
  const [tasksSearchTerm, setTasksSearchTerm] = useState("");
  const [action, setAction] = useState("create");
  const [task_title, setTaskTitle] = useState("");
  const [task_description, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [status, setStatus] = useState("To be done");
  const [isProcessing, setIsProcessing] = useState(false);
  const [deletableTasksList, setDeletableTasksList] = useState([]);
  const [isDeletingMultipleSingleCheck, setIsDeletingMultipleSingleCheck] =
    useState(false);
  const [taskTobeUpdated, setTaskTobeUpdated] = useState(null);
  const [taskToBeShown, setTaskToBeShown] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [inputFillError, setInputFillError] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [totalTasksCount, setTotalTasksCount] = useState(null);

  const notify = (message, type) => toast(message, { type });
  useEffect(() => {
    axios
      .get(
        `/api/project/${projectId}?page=${Number(
          activePage
        )}&status=${tasksQueryStatus}&sort_order=${tasksQuerySort}&sort_by=${tasksSortBy}&q=${tasksSearchTerm}`
      )
      .then((res) => {
        setProject(res.data.project);
        setTasks(res.data.tasks);
        setTotalTasksCount(res.data.totalProjectTasksCount);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        if (error) {
          if (error?.response?.status === 500) {
            setError("Something went wrong");
          }

          if (error?.response?.status === 404) {
            setIsLoading(false);
            router.push("/404/");
          }
        }
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    totalTasksCount,
    tasksQuerySort,
    tasksQueryStatus,
    tasksSortBy,
    tasksSearchTerm,
  ]);

  // we should be able to update the title and description of a particular project
  const changeTitleOrDescription = (e) => {
    const task_id = e.target.getAttribute("data-id");
    const updatedTasks = tasks.map((task) => {
      if (task._id === task_id) {
        return {
          ...task,
          [e.target.name]: e.target.value,
        };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  //clear all fields
  function clearFields() {
    setAction("create");
    setTaskTitle("");
    setTaskDescription("");
    setDueDate("");
    setStatus("To be done");
    setAssignees([]);
    setAttachments([]);
  }

  //navigate to the specified url
  function navigate(url) {
    if (isClicked.createOrUpdateTaskOverlay) {
      handleClose("createOrUpdateTaskOverlay");
    }

    router.push(url);
  }

  //create task
  function handleCreateTask() {
    const data = {
      task_title,
      assigned_by: user?._id,
      assignees,
      task_description,
      status,
      dueDate,
      attachments,
    };

    try {
      setIsProcessing(true);
      createTask(`/api/project/${projectId}/tasks/create`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "POST",
        },
      }).then((res) => {
        if (res.data.success) {
          setTasks((previousTasks) => {
            return [res.data.task, ...previousTasks];
          });
          setTotalTasksCount((previousCount) => (previousCount += 1));
          setIsProcessing(false);
          handleClose("createOrUpdateTaskOverlay");
          clearFields();
          notify("Task created successfully", "success");
        }
      });
    } catch (error) {
      setIsProcessing(false);
      notify("Something went wrong", "error");
      console.log(error);
    }
  }

  //update task
  const handleUpdateTask = (taskId, data) => {
    updateTask(`/api/project/${projectId}/tasks/${taskId}/`, data)
      .then((res) => {
        if (res.status === 201) {
          if (isClicked.createOrUpdateTaskOverlay) {
            handleClose("createOrUpdateTaskOverlay");
          }
          setIsProcessing(false);
          notify("Task updated successfully!", "success");
        }
      })
      .catch((error) => {
        setIsProcessing(false);
        if (error) {
          switch (error.response.status) {
            case 422:
              setInputFillError("The task title field is required!");
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

  //update task from form
  function handleUpdateTaskFromForm() {
    const data = {
      _id: taskTobeUpdated,
      task_title,
      task_description,
      status,
      dueDate,
    };

    setIsProcessing(true);

    updateTask(`/api/project/${projectId}/tasks/${taskTobeUpdated}/`, data)
      .then((res) => {
        if (res.status === 201) {
          const returnedTask = res.data.updatedTask;

          setTasks((currentTasks) => {
            const updatedTasks = currentTasks.map((task) => {
              if (task._id === returnedTask._id) {
                return {
                  ...task,
                  task_title: returnedTask.task_title,
                  status: returnedTask.status,
                  task_description: returnedTask.task_description,
                  dueDate: returnedTask.dueDate,
                  updatedAt: returnedTask.updatedAt,
                };
              } else {
                return task;
              }
            });

            return updatedTasks;
          });

          handleClose("createOrUpdateTaskOverlay");
          setIsProcessing(false);
          notify("Task updated successfully!", "success");
          clearFields();
        }
      })
      .catch((error) => {
        setIsProcessing(false);
        if (error) {
          switch (error.response.status) {
            case 422:
              setInputFillError("The task title field is required!");
              break;
            // case 423:
            //   setInputFillError(
            //     "Duplicate! You already have a project with the same title."
            //   );
            //   break;
            case 501 || 500:
              notify("Something went wrong!", "error");
              break;
            case 401:
              router.push("/login");
          }
        }
      });
  }

  const handleDeleteTask = () => {
    deleteTask(`/api/project/${projectId}/tasks/delete`, {
      tasks: deletableTasksList,
    })
      .then((res) => {
        if (res.status === 201) {
          setTotalTasksCount(
            (previousCount) => previousCount - deletableTasksList.length
          );
          const filteredData = tasks.filter(
            (task) => false === deletableTasksList.includes(task._id)
          );
          setTasks(filteredData);
          setDeletableTasksList([]);
          if (isDeletingMultipleSingleCheck) {
            setIsDeletingMultipleSingleCheck(false);
          }
          setShowActionModal(false);
          notify("Task deleted successfully!", "success");
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

  //cancel delete action
  const cancelDeleteAction = () => {
    const elements = document.getElementsByClassName("task-select-box");
    for (var i = 0; i < elements.length; i++) {
      elements[i].checked = false;
      setDeletableTasksList([]);
    }
    setIsDeletingMultipleSingleCheck(false);
    setShowActionModal(false);
  };

  // add a project to the list of selected projects to be deleted
  const addToDeletableTasksList = (id) => {
    setDeletableTasksList((previousList) => {
      return [...previousList, id];
    });
  };

  // remove a project from the list of selected projects to be deleted
  const removeFromDeletableProjectsList = (id) => {
    const filteredProjects = deletableProjectsList.filter(
      (value) => value !== id
    );
    setDeletableTasksList(filteredProjects);
  };

  // we must check to select all projects, and uncheck to remove all selected projects
  const toggleMultipleTasksDeletion = (e) => {
    if (e.target.checked) {
      setIsDeletingMultipleSingleCheck(true);
      const elements = document.getElementsByClassName("task-select-box");
      for (var i = 0; i < elements.length; i++) {
        elements[i].checked = true;
        const id = elements[i].getAttribute("data-id");
        setDeletableTasksList((previousData) => {
          return [...previousData, id];
        });
      }
    } else {
      const elements = document.getElementsByClassName("task-select-box");
      for (var i = 0; i < elements.length; i++) {
        elements[i].checked = false;
        setDeletableTasksList([]);
      }
      setIsDeletingMultipleSingleCheck(false);
    }
  };

  // we must set project details for the project to be updated before showing the overlay
  const handleSetTaskDetailsForUpdate = (task) => {
    if (taskToBeShown) {
      setTaskToBeShown(null);
    }
    setAction("update");
    const { _id, task_title, task_description, status, dueDate } = task;
    setTaskTitle(task_title);
    setTaskDescription(task_description);
    setStatus(status);
    setDueDate(dueDate);
    setTaskTobeUpdated(_id);
    handleClick("createOrUpdateTaskOverlay");
  };

  //we should be able to hide the project decription overlay if it is showing
  const hideShownTask = () => {
    setTaskToBeShown(null);
  };

  const deleteTaskFromDescription = (project_id) => {
    if (taskToBeShown) {
      setTaskToBeShown(null);
    }

    addToDeletableTasksList(project_id);
    setShowActionModal(true);
  };

  const taskDeletionWarningMessage = (
    <ActionMessge
      message={
        <>
          <p>
            Are you sure you want to delete{" "}
            {deletableTasksList.length > 1 ? "these tasks?" : "this task?"}{" "}
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

  return (
    <>
      <Head>
        <title>Taskit - Project Tasks</title>
        <meta
          name="description"
          content="Your #1 platform for project and task management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        {showActionModal && (
          <ActionModal
            title={"Delete Task"}
            warningMessage={taskDeletionWarningMessage}
            customCancelFunc={cancelDeleteAction}
            customActionFunc={handleDeleteTask}
            icon={<ExclamationIcon className="w-20 h-20 text-red-500" />}
          />
        )}

        {taskToBeShown && (
          <ShowTaskOverlay
            task={taskToBeShown}
            hideOverlay={hideShownTask}
            editTask={handleSetTaskDetailsForUpdate}
            deleteTask={deleteTaskFromDescription}
          />
        )}
        <div className="relative flex flex-col">
          <div className="flex items-center space-x-2">
            {!isLoading && (
              <>
                <FolderIcon className="w-8 h-8" />{" "}
                <span className="text-lg md:text-2xl font-semibold">
                  {project?.title}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div
              className="text-sm text-gray-400 hover:text-blue-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </div>

            <ChevronRightIcon className="w-3 h-3" />

            <div
              className="text-sm text-gray-400 hover:text-blue-500 cursor-pointer"
              onClick={() => navigate("/projects/")}
            >
              Projects
            </div>

            <ChevronRightIcon className="w-3 h-3" />

            <div className="text-sm text-black">Tasks</div>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center w-full">
          <p className="text-gray-500 text-lg font-bold">
            Total {totalTasksCount && `(${totalTasksCount})`}
          </p>
          <button
            type="button"
            className="p-2 bg-blue-500 rounded text-white text-sm font-semibold flex items-center justify-center  transition duration-50 hover:bg-blue-600 hover:drop-shadow-lg"
            onClick={() => {
              handleClick("createOrUpdateTaskOverlay");
            }}
          >
            <PlusIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
            <span>Add Task</span>
          </button>
        </div>
        {isClicked.createOrUpdateTaskOverlay && (
          <CreateOrUpdateTaskOverlay
            user={user ? user : null}
            action={action}
            task_title={task_title}
            task_description={task_description}
            status={status}
            dueDate={dueDate}
            assignees={assignees}
            setAction={setAction}
            setTaskTitle={setTaskTitle}
            setTaskDescription={setTaskDescription}
            setStatus={setStatus}
            setDueDate={setDueDate}
            setAssignees={setAssignees}
            project_title={project?.title}
            repColor={project?.repColor}
            clearFields={clearFields}
            close={() => handleClose("createOrUpdateTaskOverlay")}
            createTask={handleCreateTask}
            updateTask={handleUpdateTaskFromForm}
            isProcessing={isProcessing}
          />
        )}

        {error && (
          <div className="p-2 bg-red-500 text-white text-center font-md font-semibold mt-3 rounded">
            {error}
          </div>
        )}

        <div className="mt-4 border border-slate-100 overflow-x-auto md:overflow-x-none">
          <div className="flex justify-between items-center px-2 border-b border-b-slate-100 py-2">
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

              <button
                className={`flex items-center outline-none px-2 py-1 rounded border border-slate-100 ${
                  deletableTasksList.length > 0
                    ? "bg-red-500 text-white"
                    : "bg-slate-100 text-gray-400"
                }`}
                disabled={deletableTasksList.length === 0 && true}
                onClick={() => setShowActionModal(true)}
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
                value={tasksSearchTerm}
                className="outline-none bg-inherit w-[100px] md:w-fit"
                placeholder="Search..."
                onChange={(e) => setTasksSearchTerm(e.target.value)}
              />
              {!isEmpty(tasksSearchTerm) && (
                <XIcon
                  className="w-4 h-4 cursor-pointer"
                  title="Clear"
                  onClick={() => setTasksSearchTerm("")}
                />
              )}
            </div>
          </div>

          <div
            className="projects-header-grid text-xs md:text-sm font-semibold 
          text-gray-500 border-b border-slate-100"
          >
            <div className="task-check-all-header p-2">
              <input
                type={"checkbox"}
                onChange={(e) => toggleMultipleTasksDeletion(e)}
                checked={isDeletingMultipleSingleCheck}
              />
            </div>

            <div className="task-title-header p-2 text-md">Task Title</div>

            <div className="hidden md:inline-block task-description-header p-2 text-md">
              Description
            </div>

            <div className="hidden md:inline-block task-status-header p-2 text-md">
              Status
            </div>

            <div className="hidden md:inline-block task-due-date-header p-2 text-md">
              Due date
            </div>

            <div className="hidden md:inline-block task-last-updated-header p-2 text-md">
              Updated at
            </div>

            <div className="task-actions-header p-2 text-md">Actions</div>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center p-2">
              <div className="text-slate-400 font-semibold text-sm py-2">
                Loading tasks...
              </div>
            </div>
          )}

          {!isLoading && tasks?.length < 1 && (
            <div className="text-center p-2">
              <p className="text-sm text-gray-500">No tasks found!</p>
            </div>
          )}

          {!isLoading && tasks?.length > 0 && (
            <>
              {tasks?.map((task) => (
                <Task
                  key={task?._id}
                  task={task}
                  changeTitleOrDescription={changeTitleOrDescription}
                  handleUpdateTask={handleUpdateTask}
                  addToDeletableTasksList={addToDeletableTasksList}
                  removeFromDeletableTasksList={removeFromDeletableProjectsList}
                  handleSetTaskDetailsForUpdate={handleSetTaskDetailsForUpdate}
                  showTask={setTaskToBeShown}
                />
              ))}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const user = session?.user;
    return {
      props: { user },
    };
  }
}

export default Index;
