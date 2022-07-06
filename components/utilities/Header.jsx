import React from 'react'

const Header = ({title,breadcrumb}) => {
  return (
    <div className='relative'>
        <h1 className='font-semibold text-2xl'>{title}</h1>
        {breadcrumb}
    </div>
  )
}

export default Header