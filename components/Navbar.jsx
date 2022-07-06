/* eslint-disable @next/next/no-img-element */
import { 
  BellIcon, 
  ChatAlt2Icon, 
  ChevronDownIcon, 
  MenuIcon, 
  PlusCircleIcon } from '@heroicons/react/outline';
import React, { useEffect } from 'react'
import { useContextState } from '../contexts/ContextProvider'
import {AddOverlay,ChatOverlay,NotificationOverlay, ProfileOverlay} from './utilities';
import Charvatar from './utilities/Charvatar';
import NavButton from './utilities/NavButton';

const Navbar = ({user}) => {

    const {
      isSidebarOpen,
      setIsSidebarOpen,
      isClicked,
      setIsClicked,
      handleClick,
      screenSize,
      setScreenSize
    } = useContextState();

    const handleResize = () => setScreenSize(window.innerWidth);
    useEffect(() => {      
      window.addEventListener('resize',handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);


    },[]);

    useEffect(() => {
      if(screenSize <= 900){
        setIsSidebarOpen(false);
      }else{
        setIsSidebarOpen(true);
      }
    },[screenSize]);

  return (
    <div className='flex justify-between items-center py-2 px-2'>
        <NavButton 
        icon={<MenuIcon className='w-6 h-6'/>}
        customFunc={() => setIsSidebarOpen(previousState => !previousState)}
        />

        <div className='flex space-x-3'>
            <NavButton
            icon={<PlusCircleIcon className="w-6 h-6"/>}
            color={'#03C9D7'}
            customFunc={() => handleClick('addOverlay')}
            />

            <NavButton
            icon={<BellIcon className="w-6 h-6"/>}
            dotColor={"orange"}
            color={'#03C9D7'}
            customFunc={() => handleClick('notificationOverlay')}
            />

            <NavButton
            icon={<ChatAlt2Icon className="w-6 h-6"/>}
            dotColor={"blue"}
            color={'#03C9D7'}
            customFunc={() => handleClick('chatOverlay')}
            />
           
           <div className='flex space-x-1 items-center px-3 py-1 hover:bg-white rounded-full cursor-pointer'
           onClick={() => handleClick('profileOverlay')}
           >
            {
                user?.avatar ? <img src={`user?.avatar`} className='w-8 h-8 rounded-full' alt={user?.fullName} /> : <Charvatar
                width={35}
                height={35}
                text={user?.name}
                fontSize={14}
                color='#ffffff'
                />
            }
            <p className='hidden md:inline-block text-sm text-gray-400'>Hi,{' '}<span className='font-bold'>{user?.name.split(" ")[0]} {' .'}{user?.name.split(" ")[1].charAt(0)}</span></p>
            <ChevronDownIcon className='w-4 h-4 text-gray-400'/>
           </div>

           {isClicked.addOverlay && <AddOverlay/>}
           {isClicked.notificationOverlay && <NotificationOverlay/>}
           {isClicked.chatOverlay && <ChatOverlay/>}
           {isClicked.profileOverlay && <ProfileOverlay/>}
        </div>
    </div>
  )
}

export default Navbar