import { SearchIcon } from '@heroicons/react/outline';
import React from 'react';
import { isEmpty } from '../helpers';
import { Project, TrashIcon,XIcon } from './utilities/Project';


const Projects = ({
    projects,
    isLoading,
    deletableProjectsList,
    initiateProjectDeleteAction,
    projectsSearchTerm,
    isDeletingMultipleSingleCheck
}) => {
  return (
    <div className='mt-4 border border-slate-100 overflow-x-auto md:overflow-x-none'>
                  
                   <div className='flex justify-between items-center px-2 border-b border-b-slate-100'>
                      <button className={`flex items-center outline-none ${deletableProjectsList.length > 0 ? 'text-red-500' : 'text-gray-400'}`}
                       disabled={deletableProjectsList.length === 0 && true}
                       onClick={initiateProjectDeleteAction}
                       >
                          <TrashIcon className='w-3 h-3'/>
                          <span className='text-xs font-semibold'>Delete</span>
                      </button>
                    
                      <div className='flex gap-3 items-center  bg-inherit px-2 py-1 rounded w-fit'>
                        <SearchIcon className='w-4 h-4 text-gray-400'/>
                        <input type={'text'} value={projectsSearchTerm}
                        className='outline-none bg-inherit w-fit' placeholder='Search...'
                        onChange={(e) => setProjectsSearchTerm(e.target.value)}
                        />
                        {
                          !isEmpty(projectsSearchTerm) && (
                            <XIcon className='w-4 h-4 cursor-pointer' title="Clear" onClick={() => setProjectsSearchTerm('')}/>
                          )
                        }
                      </div>
                      
                   </div>
                   <div className='projects-header-grid text-xs md:text-sm font-semibold text-gray-500 border-b border-slate-100 bg-white'>
                     <div className='project-check-all-header p-2'>
                        <input type={'checkbox'} onChange={(e) => toggleMultipleProjectsDeletion(e)} checked={isDeletingMultipleSingleCheck} />
                     </div>

                     <div className='project-title-header p-2'>
                        Project Title
                     </div>

                     <div className='hidden md:inline-block project-description-header p-2'>
                        Description
                     </div>

                     <div className='hidden md:inline-block project-status-header p-2'>
                        Status
                     </div>

                     <div className='hidden md:inline-block project-due-date-header text-center p-2'>
                        Due date
                     </div>

                     <div className='project-actions-header text-center p-2'>
                        Actions
                     </div>
                   </div>
                    
                     {
                      isLoading && (
                        <div className='flex justify-center items-center p-2'>
                            <div className='font-bold text-md py-2'>Loading...</div>
                        </div>
                      )
                    }
                    
                    {
                      !isLoading && projects?.length < 1 && (
                          <div className='text-center p-2'>
                              <p className='text-sm text-gray-500'>No projects found!</p>
                          </div>
                      )
                    }

                   {
                      !isLoading && projects?.length > 0 && projects?.slice(0,projectsSliceLimit).map(project => (
                        <Project  
                        key={project?._id} 
                        project={project} 
                        changeTitleOrDescription={changeTitleOrDescription}
                        initiateProjectDeleteAction={initiateProjectDeleteAction}
                        updateProject={handleUpdateProjectByTitleOrDescription}
                        addToDeletableProjectsList={addToDeletableProjectsList}
                        removeFromDeletableProjectsList={removeFromDeletableProjectsList}
                        handleSetProjectDetailsForUpdate={handleSetProjectDetailsForUpdate}
                        />
                      ))
                   }
                </div>
  )
}

export default Projects