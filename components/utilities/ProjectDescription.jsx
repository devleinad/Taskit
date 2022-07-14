import React from 'react';
import Charvatar from './Charvatar';
import {PaperClipIcon } from '@heroicons/react/outline';
import moment from 'moment';


const ProjectDescription = ({project}) => {
  console.log(project);
  return (

      
      <div className="relative mt-3">
        <dl>
          <div className="dark:bg-[#1e1f21bf] px-4 py-5 flex space-x-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">Title</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 tdark:text-white">{project?.title}</dd>
          </div>

          <div className="even:bg-gray-50 dark:bg-black px-4 py-5 flex space-x-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">Representing color</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
              <div className={`h-5 w-5 rounded ${project?.repColor === "#000000" && 'border dark:border-slate-700'}`} 
              style={{backgroundColor:`${project?.repColor}`}}></div>
            </dd>
          </div>
    


          <div className="dark:bg-black px-4 py-5 flex space-x-4 items-center sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">Created by</dt>
            <dd className="flex items-center space-x-1">
              <Charvatar text={project?.creator?.fullName} width={30} height={30} borderRadius={'50%'} fontSize={12}/>
              <span className='text-sm text-gray-500 dark:text-white'>{project?.creator?.fullName}</span>
            </dd>
          </div>

          <div className="bg-gray-50 dark:bg-[#1e1f21bf] px-4 py-5 flex space-x-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">{project?.status}</dd>
          </div>

          
          <div className="dark:bg-[#1e1f21bf] px-4 py-5 flex space-x-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white cols-1">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 dark:text-white cols-3">
              {project?.description}
            </dd>
          </div>

          <div className="even:bg-gray-50 dark:bg-black px-4 py-5 flex space-x-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">Due date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 dark:text-white">
              {project.dueDate === new Date().toDateString() ? 'Today' : project?.dueDate}
            </dd>
          </div>
          
          <div className="dark:bg-[#1e1f21bf] px-4 py-5 flex space-x-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">Created at</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 dark:text-white">
              {project?.createdAt ? moment(project?.createdAt).format('MMM DD, YYYY') : ''}
            </dd>
          </div>

           <div className="even:bg-gray-50 dark:bg-black px-4 py-5 flex space-x-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">Updated at</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 dark:text-white">
              {project.updatedAt ? moment(project?.updatedAt).format('MMM DD, YYYY') : ''}
            </dd>
          </div>


          <div className="dark:bg-[#1e1f21bf] px-4 py-5 flex space-x-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">Attachments</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 w-full">
              <ul role="list" className="border bg-white dark:bg-[#1e1f21bf]  border-gray-200 dark:border-slate-700 rounded-md divide-y divide-gray-200 dark:divide-slate-700">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-yellow-600" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate dark:text-white">resume_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-white dark:hover:text-yellow-500">
                      Download
                    </a>
                  </div>
                </li>
                 <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-yellow-600" aria-hidden="true" />
                    <span className="ml-2 flex-1 w-0 truncate dark:text-white">cover_letter_back_end_developer.pdf</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-white dark:hover:text-yellow-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
  )
}

export default ProjectDescription