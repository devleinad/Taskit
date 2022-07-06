import { XIcon } from '@heroicons/react/outline';
import React from 'react'
import { useState } from 'react';

export const ColorPallete = ({onChange,customCloseFunc}) => {
    const [selectedBgColor,setSelectedBgColor] = useState('#071D90');
    
    const handleOnChange = (color) => {
        setSelectedBgColor(color);
        onChange(() => color);
    };

    const bgColors = [
        '#071D90','#FFFFFF','#F47373','#37D67A', 
        '#2CCCE4','#555555','#2E8B57','#DCE775',
        '#FF8A65','#BA68C8','#A52A2A','#DC143C',
        '#B8860B','#006400','#008B8B','#8B0000',
        '#2F4F4F','#228B22','#4B0082','#800000',
        '#C71585','#FF4500','#4169E1','#E67E22',
        '#257A7A','#2471A3','#407292','#196338',
        '#F7DC6F','#0000FF','#141414','#A52A2B'
    ]
  return (
    <div className='absolute bg-white p-2 rounded shadow-lg w-full md:w-[300px]'>
        <div className='flex justify-between items-center'>
            <div className='text-md font-semibold text-gray-500 '>Color picker</div>
            <XIcon className='w-5 h-5 cursor-pointer' onClick={customCloseFunc}/>
        </div>

            <div className='h-20 w-full rounded border border-slate-100 mt-2 flex justify-center items-center' style={{backgroundColor:`${selectedBgColor}`}}>
                <div className={`font-semibold text-sm ${selectedBgColor === '#FFFFFF' ? 'text-gray-500' : 'text-white'}`}>{selectedBgColor}</div>
            </div>
             <div className='grid grid-cols-8 mt-2'>
                {
                    bgColors.map(bgColor => (
                        <div className={`rounded w-7 h-6 mb-1 cursor-pointer ${bgColor === '#FFFFFF' && 'border border-slate-100'}`} key={bgColor} style={{backgroundColor:`${bgColor}`}} onClick={() => handleOnChange(bgColor)}></div>
                    ) )
                }
            </div>
    </div>
  )
}
