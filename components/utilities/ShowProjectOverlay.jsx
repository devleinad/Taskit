import { XIcon } from '@heroicons/react/outline'
import React from 'react'
import ProjectDescription from './ProjectDescription'

const ShowProjectOverlay = ({project,hideOverlay}) => {
  return (
        <div className='fixed top-0 left-0 bg-overlay zindex-1001 w-full h-full flex justify-end overflow-x-hidden'>
            <div className='w-full md:overlay-inner-width bg-white p-2 md:p-6'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold text-lg'>Project Details</h2>
                    <button type='button' className='outline-none' onClick={hideOverlay} >
                        <XIcon className='w-5 h-5'/>
                    </button>
                </div>

                {
                    project && <ProjectDescription project={project} />
                }
            </div>
        </div>
  )
}

export default ShowProjectOverlay