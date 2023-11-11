import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProjectsContext = createContext();

const ProjectsProvider = ({children}) => {
  
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);
  const [task, setTask] = useState({});
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [collaborator, setCollaborator] = useState({});
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if(!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/projects`, config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProjects();
  },[auth])

  const showAlert = alert => {
    setAlert(alert);
  }

  const submitProject = async project => {
    console.log(project);
    if(project.id){
      await editProject(project);
    }else{
      await newProject(project);
    }
  }

  const editProject = async project => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${project.id}`, project, config);
      const projectUpdated = projects.map(projectState => projectState._id === data._id ? data : projectState);
      setProjects(projectUpdated);
      setAlert({
        msg: 'Proyecto Actualizado Correctamente',
        error: false
      });
      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const newProject = async project => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/projects`, project, config);
      setProjects([...projects, data]);
      setAlert({
        msg: 'Proyecto Creado Correctamente',
        error: false
      });
      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const getProject = async id => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`, config);
      setProject(data);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }

    setLoading(false);
  }

  const deleteProject = async id => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`, config);

      const projectsUpdated = projects.filter(project => project._id !== id);
      setProjects(projectsUpdated);

      setAlert({
        msg: data.msg,
        error: false
      });

      setTimeout(() => {
        setAlert({});
        navigate('/projects');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalTask = () => {
    setModalFormTask(!modalFormTask);
    setTask({});
  }

  const submitTask = async task => {
    
    if(task?.taskId){
      await editTask(task);
    }else{
      await createTask(task);
    }
  }

  const editTask = async task => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${task.taskId}`, task, config);
      const projectUpdated = {...project};
      projectUpdated.tasks = projectUpdated.tasks.map(taskState => taskState._id === data._id ? data : taskState);
      setProject(projectUpdated);
      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  }

  const createTask = async task => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, task, config);
      const projectUpdated = {...project  };
      projectUpdated.tasks = [...project.tasks, data];
      setProject(projectUpdated);
      setAlert({});
      setModalFormTask(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleModalEditTask = task => {
    setTask(task);
    setModalFormTask(true);
  }

  const handleModalDeleteTask = task => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  }

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${task._id}`, config);
      setAlert({
        msg: data.msg,
        error: false
      });
      const projectUpdated = {...project}
      projectUpdated.tasks = projectUpdated.tasks.filter(taskState => taskState._id !== task._id);
      setProject(projectUpdated);
      setModalDeleteTask(false);
      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }
  
  const submitCollaborator = async email => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/projects/collaborators`, { email }, config);
      setCollaborator(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const addCollaborator = async email => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/projects/collaborators/${project._id}`, email, config);
      setAlert({
        msg: data.msg,
        error: false
      });
      setCollaborator({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const handleModalDeleteCollaborator = collaborator => {
    setModalDeleteCollaborator(!modalDeleteCollaborator);
    setCollaborator(collaborator);
  }

  const deleteCollaborator = async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/projects/delete-collaborator/${project._id}`, {id: collaborator._id}, config);
      const projectUpdted = {...project};
      setProject(projectUpdted);
      projectUpdted.collaborators = projectUpdted.collaborators.filter(collaboratorState => collaboratorState._id !== collaborator._id);
      setAlert({
        msg: data.msg,
        error: false
      });
      setCollaborator({});
      setModalDeleteCollaborator(false);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const signOutProjects = () => {
    setProjects([]);
    setProject({});
    setAlert({});
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        alert,
        project,
        loading,
        showAlert,
        submitProject,
        getProject,
        deleteProject,
        modalFormTask,
        handleModalTask,
        submitTask,
        handleModalEditTask,
        task,
        modalDeleteTask,
        handleModalDeleteTask,
        deleteTask,
        submitCollaborator,
        collaborator,
        addCollaborator,
        handleModalDeleteCollaborator,
        modalDeleteCollaborator,
        deleteCollaborator,
        signOutProjects
      }}
    >{children}
    </ProjectsContext.Provider>
  );
}

export {
  ProjectsProvider
}

export default ProjectsContext;