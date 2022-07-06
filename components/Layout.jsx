import React, { useEffect } from 'react'
import { useContextState } from '../contexts/ContextProvider'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
// import { ToastContainer } from 'react-toastify';

function Layout({user,children}) {
    const {isSidebarOpen} = useContextState();
    
  return (
    
   <React.Fragment>
     {/* <ToastContainer/> */}
      <div className='pb-10 md:pb-0'>
       {
        isSidebarOpen && (
            <div className='fixed w-55 min-h-screen bg-white border border-r-slate-100' style={{zIndex:1000}}>
                <Sidebar/>
            </div>
        )
        
       }
        <div className={`min-h-screen ${isSidebarOpen ? 'md:ml-230' : 'flex-2'}` }>
            <Navbar user={user}/>
            <main className='mx-2 md:p-3'>
              {children}
            </main>
        </div>
    </div>
   </React.Fragment>
  )
}

export default Layout