import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRightIcon, FolderIcon, PlusIcon, SearchIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import Layout from '../../../components/Layout';
import { getAllUserProjects,createProject, deleteProject, updateProjectTitleOrDescription, isEmpty, updateProject } from '../../../helpers';
import { useContextState } from '../../../contexts/ContextProvider';
import CreateOrUpdateProjectOverlay from '../../../components/utilities/CreateOrUpdateProjectOverlay';
import { Project } from '../../../components/utilities/Project';
import DeleteActionModal from '../../../components/utilities/DeleteActionModal';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

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
  const [isProcessing,setIsProcessing] = useState(false);
  const [action,setAction] = useState('create');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [repColor, setRepColor] = useState('#071D90');
  const [status, setStatus] = useState('Active');
  const [dueDate, setDueDate] = useState('');
  const [showDeleteActionModal,setShowDeleteActionModal] = useState(false);
  const [inputFillError,setInputFillError] = useState('');
  const [deletableProjectsList,setDeletableProjectsLists] = useState([]);
  const [isDeletingMultipleSingleCheck,setIsDeletingMultipleSingleCheck] = useState(false);
  const [projectTobeUpdatedId,setProjectTobeUpdatedId] = useState(null);


  const {isClicked,handleClick,handleClose} = useContextState();

  const notify = (message,type,position="bottom-right") => toast(message,{type},{position});
  const router = useRouter();
 

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
    });
    },1500);
  },[projectsQuerystatus,projectsSortBy,projectsQuerySort,projectsSearchTerm]);

  // we should be able to update the title and description of a particular project
  const changeTitleOrDescription = (e) => {
    const project_id = e.target.getAttribute('data-id');
    const updatedProjects = projects.map(project => {
      if(project._id === project_id){
        return {
          ...project,
          [e.target.name]:e.target.value
        }
      }else{
        return project;
      }
    }) ;
      setProjects(updatedProjects);
  }



  //create a project
  const handleCreateOrUpdateProject = () => {
    const data = {title,repColor,status,dueDate,description};

    if(action === "create"){
        setIsProcessing(true);
        createProject(data).then(res => {
          if(res.status === 201){
            setProjects(previousData => {
              return [res.data.project,...previousData];
            });
            handleClose('createOrUpdateProjectOverlay');
            setIsProcessing(false);
            clearFields();
          
            notify("Project created successfully!","success");
          }
        }).catch((error) => {
          setIsProcessing(false);
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
        });

    }

     if(action === "update"){
      setIsProcessing(true);
       updateProject(projectTobeUpdatedId,data).then(res => {
        if(res.status === 201){
          const returnedProject = res.data.updatedProject;
          console.log(returnedProject.title);
          // const updatedProjects = projects.map(project => {
          //   if(project._id === returnedProject._id){
          //     return {
          //       ...project,
          //       title:returnedProject.title,
          //       repColor:returnedProject.repColor,
          //       status:returnedProject.status,
          //       description:returnedProject.description,
          //       dueDate:returnedProject.dueDate,
          //       updatedAt:returnedProject.updatedAt,
          //     }
          //   }else{
          //     return project;
          //   }
          // });
      
          setProjects(currentProjects => {
            const updatedProjects = currentProjects.map(project => {
              if(project._id === returnedProject._id){
                return {
                  ...project,
                  title:returnedProject.title,
                  repColor:returnedProject.repColor,
                  status:returnedProject.status,
                  description:returnedProject.description,
                  dueDate:returnedProject.dueDate,
                  updatedAt:returnedProject.updatedAt,
                }
              }else{
                return project;
              }
            });

            console.log(updatedProjects);

            return updatedProjects;
          });

          handleClose('createOrUpdateProjectOverlay');
          setIsProcessing(false);
          notify("Project updated successfully!","success");
          clearFields();
        }
       }).catch(error => {
          setIsProcessing(false);
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
       });
    }
    
}

  //update a projects title or description

  const handleUpdateProjectByTitleOrDescription = (projectId,data) => {
    setError(false);
    updateProjectTitleOrDescription(projectId,data).then(res => {
      if(res.status === 200){
        // notify("Project updated successfully!","success");
        return true;
      }
    }).catch(() => {
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
    });
    

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
    });
  }


  //clear fields when 
  const clearFields = () => {
    setProjectTobeUpdatedId(null);
    setTitle('');
    setRepColor('#071D90');
    setStatus('Active');
    setDueDate('');
    setDescription('');
    setInputFillError('');
    setError(false);
    setProjectTobeUpdatedId(null);
    setAction('create');
  }

  const initiateProjectDeleteAction = () => {
    setShowDeleteActionModal(true);
  }

 
  const cancelDeleteAction = () => {
    setShowDeleteActionModal(false);
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


  const handleSetProjectDetailsForUpdate = (project) => {
    setAction('update');
    const {_id,title,description,status,dueDate,repColor} = project;
    setTitle(title);
    setDescription(description);
    setStatus(status);
    setDueDate(dueDate);
    setRepColor(repColor);
    setProjectTobeUpdatedId(_id);
    handleClick('createOrUpdateProjectOverlay');
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
                  onClick={() => {
                    setAction('create');
                    handleClick('createOrUpdateProjectOverlay')
                  }}
                  >
                      <PlusIcon className='w-4 h-4 text-white'/>
                      <span>Add <span className='hidden md:inline'>project</span></span>
                  </button>

              </div>

             

              {
                isClicked.createOrUpdateProjectOverlay && <CreateOrUpdateProjectOverlay
                action={action}
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
                handleCreateOrUpdateProject={handleCreateOrUpdateProject}
                isProcessing={isProcessing}
                inputFillError={inputFillError}
                 />
              }


           
                 <div className='mt-4 border border-slate-100 overflow-x-auto md:overflow-x-none'>
                  
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
                     <div className='project-check-all-header p-2'>
                        <input type={'checkbox'} onChange={(e) => toggleMultipleProjectsDeletion(e)} checked={isDeletingMultipleSingleCheck} />
                     </div>

                     <div className='project-title-header p-2'>
                        Project Title
                     </div>

                     <div className='hidden md:inline-block project-description-header p-2'>
                        Description
                     </div>

                     <div className='hidden md:inline-block project-status-header p-2'>
                        Status
                     </div>

                     <div className='hidden md:inline-block project-due-date-header text-center p-2'>
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
                        changeTitleOrDescription={changeTitleOrDescription}
                        initiateProjectDeleteAction={initiateProjectDeleteAction}
                        updateProject={handleUpdateProjectByTitleOrDescription}
                        addToDeletableProjectsList={addToDeletableProjectsList}
                        removeFromDeletableProjectsList={removeFromDeletableProjectsList}
                        handleSetProjectDetailsForUpdate={handleSetProjectDetailsForUpdate}
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