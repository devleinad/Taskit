import {FolderIcon, XIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { isEmpty } from '../../helpers';
import { ColorPallete } from './ColorPallete';

const EditProjectOverlay = ({
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
    handleCreateOrUpdateProject,
    inputFillError
}) => {

const [step,setStep] = useState(1);
const [showColorPalette,setShowColorPalette] = useState(false);


const close = () => {
    handleClose('createOUpdateProjectOverlay');
    clearFields();
}

const createProject = () => {
    if(showColorPalette){
        setShowColorPalette(false);
    }

    handleCreateOrUpdateProject('update');
}



let proceedToUpdateProjectBtn;
if(!isEmpty(title)){
    proceedToUpdateProjectBtn = (
        <button className='px-3 py-2 rounded bg-blue-600 text-white font-semibold 
        text-md hover:drop-shadow-lg'
        onClick={createProject}
        >
           {isProcessing ? 'Updating...' : 'UPDATE PROJECT'}
        </button>
    )
}else{
    proceedToUpdateProjectBtn = (
        <button className='px-3 py-2 rounded bg-gray-200 text-gray-600 font-semibold text-md flex space-x-2 hover:drop-shadow-lg'
        disabled>
            UPDATE PROJECT
        </button>
    )
}
    
  return (
    <div className='fixed top-0 left-0 bg-overlay zindex-1001 w-full h-full flex items-center 
    justify-center overflow-x-hidden'>
        <div className='w-full md:overlay-inner-width bg-white p-2 md:p-6 rounded'>
            <div className='flex items-center justify-between'>

                <div className='flex space-x-1 items-center'>
                    <FolderIcon className='w-7 h-7 text-yellow-500'/>
                    <span className='text-lg font-semibold md:font-bold'>Edit Project</span>
                </div>

                <XIcon className='w-6 h-6 cursor-pointer ' onClick={close} />

            </div>
            
            {
                step === 1 && (
                    <React.Fragment>
                        <div className='mt-4'>
                            {
                                inputFillError && (
                                    <div className='text-center p-2 rounded font-semibold text-red-500'>{inputFillError}</div>
                                )
                            }
                            {
                                showColorPalette && <div className='flex justify-center'>
                                    <ColorPallete 
                                    onChange={setRepColor}
                                    customCloseFunc={() => setShowColorPalette(false)}
                                    />
                                </div>
                            }
                            
                            <div className='flex flex-col gap-1'>
                                <label className='text-md font-semibold text-gray-500'>Title of project</label>
                                <input 
                                className='p-2 rounded border border-slate-100 hover:border-blue-200 outline-none'
                                type={"text"} 
                                name='title' 
                                value={title}
                                placeholder='eg. Learn web development'
                                onChange={(e) => setTitle(e.target.value)}
                                onFocus={() => {
                                    if(showColorPalette){
                                        setShowColorPalette(false);
                                    }
                                }}
                                 />
                            </div>

                            <div className='mt-5'>
                                <div className='flex flex-col md:flex-row gap-6 md:items-center'>
                                    <div className='flex flex-col w-full md:w-1/3 gap-1'>
                                        <label className='text-md font-semibold text-gray-500'>Project color</label>
                                        <div className='w-auto p-2 rounded cursor-pointer text-center font-semibold' 
                                        name="repColor"
                                        value={repColor} 
                                        style={{backgroundColor:repColor, color:repColor === '#ffffff' ? '#000000' : '#ffffff'}}
                                        onClick={() => setShowColorPalette(true)}
                                        >
                                            {repColor}
                                        </div>
                                    </div>

                                    <div className='flex flex-col w-full md:w-1/3 gap-1'>
                                        <label className='text-md font-semibold text-gray-500'>Project status</label>
                                        <select className='border border-slate-200 rounded p-2'
                                        name='status'
                                        value={status} 
                                        onChange={(e) => setStatus(e.target.value) }
                                        onFocus={() => {
                                            if(showColorPalette){
                                                setShowColorPalette(false);
                                            }
                                        }}
                                                >
                                            <option value={'Active'}>Active</option>
                                            <option value={'Completed'}>Completed</option>
                                        </select>
                                    </div>


                                    <div className='flex flex-col w-full md:w-1/3 gap-1'>
                                        <label className='text-md font-semibold text-gray-500'>Due date</label>
                                        <input type={'date'} className='border border-slate-200 rounded p-2'
                                        name='dueDate'
                                        value={dueDate} 
                                        onChange={(e) => setDueDate(e.target.value) }
                                        onFocus={() => {
                                            if(showColorPalette){
                                                setShowColorPalette(false);
                                            }
                                        }}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className='flex flex-col gap-1 mt-5'>
                                <label className='text-md font-semibold text-gray-500'>Description</label>
                                <textarea rows={2} className='border border-slate-200 rounded p-2 outline-none hover:border-blue-200'
                                name='description'
                                value={description} 
                                onChange={(e) => setDescription(e.target.value) }
                                onFocus={() => {
                                    if(showColorPalette){
                                        setShowColorPalette(false);
                                    }
                                }}
                                />
                            </div>

                           <div className='mt-5 flex justify-center'>
                                {proceedToUpdateProjectBtn}
                           </div>
                            
                    </div>
                    </React.Fragment>
                )
            }
        </div>
    </div>
  )
}

export default EditProjectOverlay