import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRightIcon, FolderIcon, PlusIcon, SearchIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import Layout from '../../../components/Layout';
import { getAllUserProjects,createProject, deleteProject, updateProjectTitleOrDescription, isEmpty } from '../../../helpers';
import { useContextState } from '../../../contexts/ContextProvider';
import CreateProjectOverlay from '../../../components/utilities/CreateProjectOverlay';
import { Project } from '../../../components/utilities/Project';
import DeleteActionModal from '../../../components/utilities/DeleteActionModal';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
<<<<<<< HEAD
import { useRouter } from 'next/router';
=======
>>>>>>> 1c4a6174588dbf5514ce99786448d7f6534efff3

const Index = ({user}) => {
  const [projects,setProjects] = useState([]);
  const [error,setError] = useState(false);
  const [isLoading,setIsLoading] = useState(true);
  const [projectsSliceLimit,setProjectsSliceLimit] = useState(12);
  const [projectsQuerystatus,setProjectsQueryStatus] = useState('all');
  const [projectsQuerySort,setProjectsQuerySort] = useState('desc');
  const [projectsSortBy,setProjectsSortBy] = useState('_id');
  const [projectsSearchTerm,setProjectsSearchTerm] = useState('');
  //details for creating projects
  const [isCreatingProject,setIsCreatingProject] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [repColor, setRepColor] = useState('#071D90');
  const [status, setStatus] = useState('Active');
  const [dueDate, setDueDate] = useState('');
  const [projectTobeDeletedId,setProjectTobeDeletedId] = useState(null);
  const [showDeleteActionModal,setShowDeleteActionModal] = useState(false);
  const [inputFillError,setInputFillError] = useState('');
  const [deletableProjectsList,setDeletableProjectsLists] = useState([]);
  const [isDeletingMultipleSingleCheck,setIsDeletingMultipleSingleCheck] = useState(false);

  const {isClicked,handleClick,handleClose} = useContextState();

  const notify = (message,type,position="bottom-right") => toast(message,{type},{position});
<<<<<<< HEAD
  const router = useRouter();
=======

>>>>>>> 1c4a6174588dbf5514ce99786448d7f6534efff3
 

  useEffect(() => {
    setTimeout(() => {
    setError(false);
    getAllUserProjects(projectsQuerystatus,projectsQuerySort,projectsSortBy,projectsSearchTerm).then(res => {
      setProjects(res.data.projects);
      setIsLoading(false);
    }).catch(() => {
      setError(true);
      setIsLoading(false);
      notify('Something went wrong!','error');
    })
    },1500);
  },[projectsQuerystatus,projectsSortBy,projectsQuerySort,projectsSearchTerm]);




  //create a project
  const handleCreateProject = () => {
    setIsCreatingProject(true);
    const data = {title,repColor,status,dueDate,description};
    createProject(data).then(res => {
      if(res.status === 201){
        setProjects(previousData => {
          return [res.data.project,...previousData];
        });
        setIsCreatingProject(false);
        clearFields();
        notify("Project created successfully!","success");
      }
    }).catch((error) => {
      setIsCreatingProject(false);
<<<<<<< HEAD
      if(error){
        switch(error.response.status){
          case 422:
            setInputFillError('The project title field is required!');
            break;
          case 423:
            setInputFillError('Duplicate! You already have a project with the same title.');
            break;
          case 501 || 500:
            notify("Something went wrong!","error");
            break;
          case 401:
            router.push('/login');
        }
      }
=======
     notify("New project creation failed!","error");
>>>>>>> 1c4a6174588dbf5514ce99786448d7f6534efff3
    })
  }

  //update a projects title or description

  const handleUpdateProjectByTitleOrDescription = (projectId,data) => {
    setError(false);
    updateProjectTitleOrDescription(projectId,data).then(res => {
      if(res.status === 201){
        notify("Project updated successfully!","success");
        console.log('Update successful!')
      }
    }).catch(() => {
<<<<<<< HEAD
      if(error){
        switch(error.response.status){
          case 422:
            setInputFillError('The project title field is required!');
            break;
          case 423:
            setInputFillError('Duplicate! You already have a project with the same title.');
            break;
          case 501 || 500:
            notify("Something went wrong!","error");
            break;
          case 401:
            router.push('/login');
        }
      }
=======
      notify("Project update failed!","error");
>>>>>>> 1c4a6174588dbf5514ce99786448d7f6534efff3
    })
  }


  const handleDeleteProject = () => {
    deleteProject({projects:deletableProjectsList}).then(res => {
      if(res.status === 201){
        const filteredData = projects.filter(project => false === deletableProjectsList.includes(project._id));
        setProjects(filteredData);
        setDeletableProjectsLists([]);
        if(isDeletingMultipleSingleCheck){
          setIsDeletingMultipleSingleCheck(false);
        }
        setShowDeleteActionModal(false);
<<<<<<< HEAD
        notify("Project deleted successfully!","success");
      }
    }).catch(() =>{
      if(error){
        switch(error.response.status){
          case 422:
            setInputFillError('The project title field is required!');
            break;
          case 423:
            setInputFillError('Duplicate! You already have a project with the same title.');
            break;
          case 501 || 500:
            notify("Project deletion failed!","error")
            break;
          case 401:
            router.push('/login');
        }
      }
=======
        setProjectTobeDeletedId(null);
        notify("Project deleted successfully!","success");
      }
    }).catch(() =>{
      notify("Project deletion failed!","error")
>>>>>>> 1c4a6174588dbf5514ce99786448d7f6534efff3
    });
  }


  //clear fields when 
  const clearFields = () => {
    setTitle('');
    setRepColor('#071D90');
    setStatus('Active');
    setDueDate('');
    setDescription('');
    setInputFillError('');
    setError(false);
  }

  const initiateProjectDeleteAction = () => {
    setShowDeleteActionModal(true);
  }

 
  const cancelDeleteAction = () => {
    setShowDeleteActionModal(false);
    setProjectTobeDeletedId(null);
  }

  const addToDeletableProjectsList = (id) => {
    setDeletableProjectsLists(previousList => {
      return [...previousList,id];
    })
  }

  const removeFromDeletableProjectsList = (id) => {
    const filteredProjects = deletableProjectsList.filter(value => value !== id);
    setDeletableProjectsLists(filteredProjects);
  }


  const toggleMultipleProjectsDeletion = (e) => {
    if(e.target.checked){
      setIsDeletingMultipleSingleCheck(true);
      const elements = document.getElementsByClassName('project-select-box');
      for(var i = 0; i < elements.length; i++){
        elements[i].checked = true;
        const id = elements[i].getAttribute('data-id');
        setDeletableProjectsLists(previousData => {
          return [...previousData,id];
        })
      }
    }else{
      setDeletableProjectsLists([]);
      setIsDeletingMultipleSingleCheck(false);
    }
  }


  const deleteProjectWarningMessage = (<React.Fragment>
    <p>Are you sure you want to delete {deletableProjectsList.length > 1 ? 'these projects?' : 'this project?'} Please remeber this action cannot be undone.</p>
    <p>Click &quot;Delete&quot; to proceed with this action, or &quot;Cancel&quot; to cancel this action.</p>
  </React.Fragment>)

  if(error) throw new Error("Some thing went wrong");

  return (
    <React.Fragment>
      <Head>
        <title>Taskit - Projects</title>
        <meta name="description" content="Your #1 platform for project and task management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Layout user={user && user}>

              {
              showDeleteActionModal && <DeleteActionModal 
              title={'Delete Project'}
              warningMessage={deleteProjectWarningMessage}
              customCancelFunc={cancelDeleteAction} 
              customActionFunc={handleDeleteProject} />
              }

           
              <div className='relative flex flex-col'>
                  <div className='flex items-center space-x-2'>
                    <FolderIcon className='w-8 h-8'/> {' '}
                    <span className=' text-2xl font-semibold'>Projects</span>
                  </div>

                  <div className='flex items-center space-x-4'>
                      <Link href={'/app/'}>
                        <div className='text-sm text-gray-400 hover:text-blue-500 cursor-pointer'>Home</div>
                      </Link>

                        <ChevronRightIcon className='w-3 h-3' />

                      <div className='text-sm text-black'>Projects</div>
                  </div>
              </div>

              <div className='mt-6 flex justify-between w-full'>
                
                  
                  <button type='button' 
                  className='px-2 py-1 bg-blue-500 rounded text-white text-sm font-semibold flex items-center justify-center  transition duration-50 hover:bg-blue-600 hover:drop-shadow-lg'
                  onClick={() => handleClick('createProjectOverlay')}
                  >
                      <PlusIcon className='w-4 h-4 text-white'/>
                      <span>Add <span className='hidden md:inline'>project</span></span>
                  </button>

              </div>

             

              {
                isClicked.createProjectOverlay && <CreateProjectOverlay
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                repColor={repColor}
                setRepColor={setRepColor}
                status={status}
                setStatus={setStatus}
                dueDate={dueDate}
                setDueDate={setDueDate}
                handleClose={handleClose}
                clearFields={clearFields}
                handleCreateProject={handleCreateProject}
                isCreatingProject={isCreatingProject}
                inputFillError={inputFillError}
                 />
              }


           
                 <div className='mt-4 border border-slate-100 overflow-x-auto md:overflow-x-none'>
                   {/* <div className='text-sm text-gray-500'>
                     <p>Sowing 1 to {projectsSliceLimit} of {projects?.length}</p>
                   </div> */}
                   <div className='flex justify-between items-center px-2 border-b border-b-slate-100'>
                      <button className={`flex items-center outline-none ${deletableProjectsList.length > 0 ? 'text-red-500' : 'text-gray-400'}`}
                       disabled={deletableProjectsList.length === 0 && true}
                       onClick={initiateProjectDeleteAction}
                       >
                          <TrashIcon className='w-3 h-3'/>
                          <span className='text-xs font-semibold'>Delete</span>
                      </button>
                    
                      <div className='flex gap-3 items-center  bg-inherit px-2 py-1 rounded w-fit'>
                        <SearchIcon className='w-4 h-4 text-gray-400'/>
                        <input type={'text'} value={projectsSearchTerm}
                        className='outline-none bg-inherit w-fit' placeholder='Search...'
                        onChange={(e) => setProjectsSearchTerm(e.target.value)}
                        />
                        {
                          !isEmpty(projectsSearchTerm) && (
                            <XIcon className='w-4 h-4 cursor-pointer' title="Clear" onClick={() => setProjectsSearchTerm('')}/>
                          )
                        }
                      </div>
                      
                   </div>
                   <div className='projects-header-grid text-xs md:text-sm font-semibold text-gray-500 border-b border-slate-100 bg-white'>
                     <div className='project-check-all-header text-center p-2'>
                        <input type={'checkbox'} onClick={(e) => toggleMultipleProjectsDeletion(e)} checked={isDeletingMultipleSingleCheck} />
                     </div>

                     <div className='project-title-header p-2'>
                        Project Title
                     </div>

                     <div className='project-description-header p-2'>
                        Description
                     </div>

                     <div className='project-status-header p-2'>
                        Status
                     </div>

                     <div className='project-due-date-header text-center p-2'>
                        Due date
                     </div>

                     <div className='project-actions-header text-center p-2'>
                        Actions
                     </div>
                   </div>
                    
                     {
                      isLoading && (
                        <div className='flex justify-center items-center p-2'>
                            <div className='font-bold text-md py-2'>Loading...</div>
                        </div>
                      )
                    }
                    
                    {
                      !isLoading && projects?.length < 1 && (
                          <div className='text-center p-2'>
                              <p className='text-sm text-gray-500'>No projects found!</p>
                          </div>
                      )
                    }

                   {
                      !isLoading && projects?.length > 0 && projects?.slice(0,projectsSliceLimit).map(project => (
                        <Project  
                        key={project?._id} 
                        project={project} 
                        initiateProjectDeleteAction={initiateProjectDeleteAction}
                        updateProject={handleUpdateProjectByTitleOrDescription}
                        addToDeletableProjectsList={addToDeletableProjectsList}
                        removeFromDeletableProjectsList={removeFromDeletableProjectsList}
                        />
                      ))
                   }
                </div>
              
            
           
        </Layout>
     
    </React.Fragment>
  )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if(!session){
        return {
            redirect : {
                destination : '/login',
                permanent:false,
            }
        }
    }else{
        return {
            props:{user:session?.user}
        }
    }
}

export default Index