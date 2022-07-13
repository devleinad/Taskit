import moment from 'moment';
import React, { useState } from 'react';
import {EyeIcon, PencilAltIcon} from "@heroicons/react/outline";

export const Project = ({
  project,
  updateProject,
  addToDeletableProjectsList,
  removeFromDeletableProjectsList,
  handleSetProjectDetailsForUpdate,
  changeTitleOrDescription
}) => {
    const [isTitleUpdated,setIsTitleUpdated] = useState(false);
    const [isDescriptionUpdated,setIsDescriptionUpdated] = useState(false);



    const handleUpdateProjectTitleOrDescription = (column) => {
        if(column === "title"){
            const data = {title:project?.title};
            if(isTitleUpdated){
              updateProject(project?._id,data);
              setIsTitleUpdated(false);
            }else{
              return;
            }
        }

       if(column === "description"){
          const data = {description:project?.description};
          if(isTitleUpdated){
              updateProject(project?._id,data);
              setIsDescriptionUpdated(false);
            }else{
              return;
            }
      }

}


  return (
    <div className='projects-body-grid bg-white text-xs md:text-sm font-semibold text-gray-500 border-b border-b-slate-100 last:border-b-0'>
        <div className='project-check-all-body p-2'>
            <input type={'checkbox'} className='py-1 project-select-box' data-id={project?._id} onClick={(e) => {
              if(e.target.checked){
                addToDeletableProjectsList(project?._id);
              }else{
                removeFromDeletableProjectsList(project?._id);
              }
            }} />
        </div>

        <div className='project-title-body p-2 flex items-center space-x-1'>
            <div className={`w-4 h-4 rounded p-2 ${project.repColor === "#ffffff" && 'border border-slate-100'}`} style={{backgroundColor:project?.repColor}}></div>
            <input className='py-1 px-1 border-none outline-none text-sm w-full font-normal 
            text-gray-500 focus:bg-slate-100'
            data-id={project?._id}
            name='title'
             value={project.title} 
             onChange={(e) => {
              setIsTitleUpdated(true);
              changeTitleOrDescription(e);
             }}
             onBlur={() => {
               if(isTitleUpdated){
                 handleUpdateProjectTitleOrDescription("title");
               }
             }}
             />
        </div>

        <div className='hidden md:inline-block  p-2'>
            <input className='py-1  px-1 border-none outline-none text-sm w-full font-normal 
            text-gray-500 focus:bg-slate-100'
            data-id={project?._id}
            name="description"
             value={project?.description} 
             onChange={(e) => {
              setIsDescriptionUpdated(true);
              changeTitleOrDescription(e);
             }}
             onBlur={() => {
               if(isDescriptionUpdated){
                 handleUpdateProjectTitleOrDescription("description");
               }
             }}
             />
        </div>

          <div className='hidden md:flex p-2 md:items-center md:gap-1'>
             <span className={`w-2 h-2 rounded-full ${project?.status === 'Active' ? 'bg-blue-400' : 'bg-green-400'}`}></span>
            <span className="text-xs font-normal">
              {project?.status}
            </span>
        </div>

        <div className='hidden md:flex p-2 text-center text-xs font-normal'>
           {project.dueDate && moment(project?.dueDate).format('D MMM, YYYY')}
        </div>

        <div className='flex  p-2 text-center  font-normal items-center justify-center gap-2'>
            <button type='button' className='bg-blue-500 px-2 py-1 rounded text-xs font-normal 
            text-white flex justify-center items-center hover:bg-blue-700' title='View'>
              <EyeIcon className='w-4 h-4'/>
            </button>
            <button type='button' className='bg-green-500  px-2 py-1 rounded text-xs font-normal 
            text-white flex justify-center items-center hover:bg-green-700' 
            onClick={() => handleSetProjectDetailsForUpdate(project)} title="Edit">
              <PencilAltIcon className='w-4 h-4'/>
            </button>
        </div>
    
    </div>
  )
}
