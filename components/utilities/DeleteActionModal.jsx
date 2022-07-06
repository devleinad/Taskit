import { ExclamationIcon } from '@heroicons/react/outline'
import React from 'react'

const DeleteActionModal = ({title,warningMessage, customCancelFunc,customActionFunc,}) => {
  return (
   <div className='fixed top-0 left-0 bg-overlay zindex-1001 w-full h-full flex items-center justify-center overflow-x-hidden'>
        <div className='w-full md:w-2/5 bg-white p-2 md:p-6 rounded'>
           <div className='flex space-x-1'>
                <ExclamationIcon className='w-20 h-20 text-red-500'/>
                <div className='flex flex-col justify-between'>
                <div className='text-lg font-bold'>{title}</div>
                <div className='text-md text-gray-400 font-normal'>{warningMessage}</div>
               <div className='flex justify-end items-center space-x-3'>
                   <button className='px-3 py-2  rounded-full text-md font-semibold hover:text-blue-500'
                   onClick={customCancelFunc}
                   >
                       CANCEL
                    </button>
                    <button className='px-3 py-2 rounded text-md font-semibold  text-white bg-red-500 hover:bg-red-600'
                     onClick={customActionFunc}>DELETE</button>
               </div>
           </div>
           </div>
           
        </div>
    </div>
  )
}

export default DeleteActionModal