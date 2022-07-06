import React from 'react'

const NavButton = ({color,dotColor,icon,customFunc}) => {
  return (
        <button type='button' 
        className='relative rounded-full md:px-2 outline-none'
        style={{color}} onClick={customFunc}>
          <span className='absolute w-2 h-2 right-2 rounded-full' style={{background:dotColor}}></span>
          {icon}
        </button>
  )
}

export default NavButton