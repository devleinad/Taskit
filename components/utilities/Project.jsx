import moment from 'moment';
import React, { useState } from 'react'

export const Project = ({project,updateProject,
   addToDeletableProjectsList,removeFromDeletableProjectsList}) => {
    const [updatedTitle,setUpdatedTitle] = useState(project.title);
    const [updatedDescription,setUpdatedDescription] = useState(project?.description);

    const isThesameTitles = () => project?.title === updatedTitle;
    const isTheseameDescriptions = () => project?.description === updatedDescription;

    const handleUpdateProjectTitleOrDescription = (column) => {
        if(column === "title"){
            const data = {title:updatedTitle};
            updateProject(project?._id,data);
        }

       if(column === "description"){
          const data = {description:updatedDescription};
          updateProject(project?._id,data);
      }

}


  return (
    <div className='projects-body-grid bg-white text-xs md:text-sm font-semibold text-gray-500 border-b border-b-slate-100 last:border-b-0'>
        <div className='project-check-all-body text-center p-2'>
            <input type={'checkbox'} className='py-1 project-select-box' data-id={project?._id} onClick={(e) => {
              if(e.target.checked){
                addToDeletableProjectsList(project?._id);
              }else{
                removeFromDeletableProjectsList(project?._id);
              }
            }} />
        </div>

        <div className='project-title-body p-2 flex space-x-1'>
            <div className={`w-6 h-6 rounded p-2 ${project.repColor === "#ffffff" && 'border border-slate-100'}`} style={{backgroundColor:project?.repColor}}></div>
            <input className='py-1 px-1 border-none outline-none text-sm w-full font-normal text-gray-500 focus:bg-slate-100'
             value={updatedTitle} 
             onChange={(e) => setUpdatedTitle(e.target.value)}
             onBlur={() => {
               if(!isThesameTitles()){
                 handleUpdateProjectTitleOrDescription("title");
               }
             }}
             />
        </div>

        <div className='project-description-body p-2'>
            <input className='py-1  px-1 border-none outline-none text-sm w-full font-normal text-gray-500 focus:bg-slate-100'
             value={updatedDescription} 
             onChange={(e) => setUpdatedDescription(e.target.value)}
             onBlur={() => {
               if(!isTheseameDescriptions()){
                 handleUpdateProjectTitleOrDescription("description")
               }
             }}
             />
        </div>

          <div className='project-status-body p-2 flex items-center gap-1'>
             <span className={`w-2 h-2 rounded-full ${project?.status === 'Active' ? 'bg-blue-400' : 'bg-green-400'}`}></span>
            <span className="text-xs font-normal">
              {project?.status}
            </span>
        </div>

        <div className='project-status-body p-2 text-center text-xs font-normal'>
           {project.dueDate && moment(project?.dueDate).format('D MMM, YYYY')}
        </div>

        <div className='project-status-body p-2 text-center  font-normal flex items-center justify-center gap-2'>
            <span className='cursor-pointer text-xs font-normal text-green-500'>Show</span>
            <span className='cursor-pointer text-xs font-normal text-blue-500'>Edit</span>
        </div>
    
    </div>
  )
}
