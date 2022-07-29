import {
  ArrowRightIcon,
  FolderAddIcon,
  FolderIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import { isEmpty } from "../../helpers";
import { ColorPallete } from "./ColorPallete";

const CreateOrUpdateProjectOverlay = ({
  action,
  title,
  setTitle,
  description,
  setDescription,
  repColor,
  setRepColor,
  status,
  setStatus,
  dueDate,
  setDueDate,
  handleClose,
  clearFields,
  isProcessing,
  createProject,
  inputFillError,
  updateProject,
}) => {
  const [step, setStep] = useState(1);
  const [showColorPalette, setShowColorPalette] = useState(false);

  const close = () => {
    if (
      action === "create" &&
      (!isEmpty(title) || !isEmpty(description) || !isEmpty(dueDate))
    ) {
      if (
        confirm(
          "Are you sure you wan to cancel the process? Please note that this action will affect the current data."
        )
      ) {
        clearFields();
        handleClose("createOrUpdateProjectOverlay");
        if (showColorPalette) {
          setShowColorPalette(false);
        }
        setStep(1);
      } else {
        return;
      }
    } else {
      clearFields();
      handleClose("createOrUpdateProjectOverlay");
      if (showColorPalette) {
        setShowColorPalette(false);
      }
    }
  };

  const handleCreateProject = () => {
    if (showColorPalette) {
      setShowColorPalette(false);
    }

    createProject();
  };

  const handleUpdateProject = () => {
    if (showColorPalette) {
      setShowColorPalette(false);
    }

    updateProject();
  };

  let proceedToCreateOrUpdateProjectBtn;
  if (!isEmpty(title)) {
    proceedToCreateOrUpdateProjectBtn = (
      <button
        className="p-3 rounded bg-blue-600 text-white font-semibold 
        text-md hover:drop-shadow-lg"
        onClick={() => {
          if (action === "create") {
            handleCreateProject();
          } else {
            updateProject();
          }
        }}
        disabled={isProcessing}
      >
        {isProcessing
          ? "processing..."
          : action === "create"
          ? "CREATE"
          : "UPDATE"}
      </button>
    );
  } else {
    proceedToCreateOrUpdateProjectBtn = (
      <button
        className="p-3 rounded bg-gray-200 text-gray-600 font-semibold text-md flex 
        space-x-2 hover:drop-shadow-lg"
        disabled
      >
        {action === "create" ? "CREATE" : "UPDATE"}
      </button>
    );
  }

  return (
    <div
      className="fixed top-0 left-0 bg-overlay zindex-1001 w-full h-full flex items-center 
    justify-center overflow-x-hidden"
    >
      <div className="w-full md:overlay-inner-width bg-white px-2 py-4 md:p-6 rounded">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 items-center">
            {action === "create" ? (
              <FolderAddIcon className="w-7 h-7 text-yellow-500" />
            ) : (
              <FolderIcon className="w-7 h-7 text-yellow-500" />
            )}
            <span className="text-lg font-semibold md:font-bold">
              {action === "create" ? "New Project" : "Edit Project"}
            </span>
          </div>

          <XIcon
            className="w-7 h-7 cursor-pointer text-gray-500"
            onClick={close}
          />
        </div>

        {step === 1 && (
          <React.Fragment>
            <div className="mt-4">
              {inputFillError && (
                <div className="text-center p-2 rounded font-semibold text-red-500">
                  {inputFillError}
                </div>
              )}
              {showColorPalette && (
                <div className="flex justify-center">
                  <ColorPallete
                    onChange={setRepColor}
                    customCloseFunc={() => setShowColorPalette(false)}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-md font-semibold text-gray-500">
                  Title of project
                </label>
                <input
                  className="p-2 rounded border border-slate-100 hover:border-blue-200 outline-none"
                  type={"text"}
                  name="title"
                  value={title}
                  placeholder="eg. Learn web development"
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => {
                    if (showColorPalette) {
                      setShowColorPalette(false);
                    }
                  }}
                />
              </div>

              <div className="mt-5">
                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                  <div className="flex flex-col w-full md:w-1/3 gap-1">
                    <label className="text-md font-semibold text-gray-500">
                      Project color
                    </label>
                    <div
                      className="w-auto p-2 rounded cursor-pointer text-center font-semibold"
                      name="repColor"
                      value={repColor}
                      style={{
                        backgroundColor: repColor,
                        color: repColor === "#ffffff" ? "#000000" : "#ffffff",
                      }}
                      onClick={() => setShowColorPalette(true)}
                    >
                      {repColor}
                    </div>
                  </div>

                  <div className="flex flex-col w-full md:w-1/3 gap-1">
                    <label className="text-md font-semibold text-gray-500">
                      Project status
                    </label>
                    <select
                      className="border border-slate-200 rounded p-2 outline-none"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      onFocus={() => {
                        if (showColorPalette) {
                          setShowColorPalette(false);
                        }
                      }}
                    >
                      <option value={"Active"}>Active</option>
                      <option value={"Completed"}>Completed</option>
                    </select>
                  </div>

                  <div className="flex flex-col w-full md:w-1/3 gap-1">
                    <label className="text-md font-semibold text-gray-500">
                      Due date
                    </label>
                    <input
                      type={"date"}
                      className="border border-slate-200 rounded p-2"
                      name="dueDate"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      onFocus={() => {
                        if (showColorPalette) {
                          setShowColorPalette(false);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-5">
                <label className="text-md font-semibold text-gray-500">
                  Description
                </label>
                <textarea
                  rows={2}
                  className="border border-slate-200 rounded p-2 outline-none hover:border-blue-200"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={() => {
                    if (showColorPalette) {
                      setShowColorPalette(false);
                    }
                  }}
                />
              </div>

              <div className="mt-5 flex justify-center">
                {proceedToCreateOrUpdateProjectBtn}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default CreateOrUpdateProjectOverlay;
