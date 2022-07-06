import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRightIcon, FolderIcon, PlusIcon, SearchIcon, TrashIcon } from '@heroicons/react/outline';
import Layout from '../../../components/Layout';
import { getAllUserProjects,createProject, deleteSingleProject, updateProjectTitleOrDescription } from '../../../helpers';
import { useContextState } from '../../../contexts/ContextProvider';
import CreateProjectOverlay from '../../../components/utilities/CreateProjectOverlay';
import { Project } from '../../../components/utilities/Project';
import DeleteActionModal from '../../../components/utilities/DeleteActionModal';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

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

  const {isClicked,handleClick,handleClose} = useContextState();

  const notify = (message,type,position="bottom-right") => toast(message,{type},{position});

 

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
    }).catch(() => {
      setIsCreatingProject(false);
     notify("New project creation failed!","error");
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
      notify("Project update failed!","error");
    })
  }


  const handleDeleteProject = () => {
    deleteSingleProject(projectTobeDeletedId).then(res => {
      if(res.status === 201){
        const filteredProjects = projects.filter(project => project._id !== projectTobeDeletedId);
        setProjects(filteredProjects);
        setShowDeleteActionModal(false);
        setProjectTobeDeletedId(null);
        notify("Project deleted successfully!","success");
      }
    }).catch(() =>{
      notify("Project deletion failed!","error")
    });
  }


  //clear fields when 
  const clearFields = () => {
    setTitle('');
    setRepColor('#071D90');
    setStatus('Active');
    setDueDate('');
    setDescription('');
  }

  const initiateDeleteAction = (projectId) => {
    setProjectTobeDeletedId(projectId);
    setShowDeleteActionModal(true);
  }

  const cancelDeleteAction = () => {
    setShowDeleteActionModal(false);
    setProjectTobeDeletedId(null);
  }


  const deleteProjectWarningMessage = (<React.Fragment>
    <p>Are you sure you want to delete this project? Please remeber this action cannot be undone.</p>
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
                isLoading && (
                  <div className='flex justify-center items-center p-2 h-70'>
                      <div className='font-bold text-md px-3 py-2 bg-white rounded-full'>Loading...</div>
                  </div>
                )
              }

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
                
                 />
              }


              {
                !isLoading && projects?.length < 1 && (
                   <div className='flex justify-center items-center p-2 h-70'>
                      <div className='flex flex-col gap-1 font-bold text-lg p-2'>
                        <p className='text-sm'>No projects found!</p>
                          <button type='button' className='px-3 py-2 bg-blue-500 text-gray-200 
                          text-sm font-semibold flex space-x-1 items-center 
                          justify-center rounded-full transition duration-30
                          hover:drop-shadow-xl
                          hover:bg-blue-700'
                          onClick={() => handleClick('createProjectOverlay')}
                          >
                            <PlusIcon className='w-5 h-5'/>
                            <span>Create</span>
                          </button>
                      </div>
                  </div>
                )
              }

            {
              !isLoading && projects?.length > 0 && (
                 <div className='mt-4 border border-slate-100 overflow-x-auto md:overflow-x-none'>
                   {/* <div className='text-sm text-gray-500'>
                     <p>Sowing 1 to {projectsSliceLimit} of {projects?.length}</p>
                   </div> */}
                   <div className='flex justify-between items-center px-2 border-b border-b-slate-100'>
                      <div className='flex items-center cursor-pointer'>
                        <TrashIcon className='w-3 h-3'/>
                        <span className='text-xs font-semibold text-gray-500'>Delete</span>
                      </div>
                      <div className='flex gap-3 items-center  bg-inherit px-2 py-1 rounded w-fit'>
                    <SearchIcon className='w-4 h-4 text-gray-400'/>
                    <input type={'text'} value={projectsSearchTerm}
                     className='outline-none bg-inherit' placeholder='Search...'
                     onChange={(e) => setProjectsSearchTerm(e.target.value)}
                    />
                  </div>
                   </div>
                   <div className='projects-header-grid text-xs md:text-sm font-semibold text-gray-500 border-b border-slate-100 bg-white'>
                     <div className='project-check-all-header text-center p-2'>
                        <input type={'checkbox'} />
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
                      projects?.slice(0,projectsSliceLimit).map(project => (
                        <Project  
                        key={project?._id} 
                        project={project} 
                        initiateDeleteAction={initiateDeleteAction}
                        updateProject={handleUpdateProjectByTitleOrDescription}
                        />
                      ))
                   }
                </div>
              )
            }
           
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