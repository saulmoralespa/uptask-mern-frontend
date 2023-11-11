import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormCollaborator from "../components/FormCollaborator";
import useProjects from '../hooks/useProjects';
import Alert from '../components/Alert';

const NewCollaborator = () => {
  
  const { getProject, project, loading, collaborator, addCollaborator, alert } = useProjects();
  const { id } = useParams();

  useEffect(() => {
    getProject(id);
  },[]);

  if(loading) return 'Cargando...';

  if(!project?._id) return <Alert alert={alert}/>
    
  return (
    <>
      <h1 className="text-4xl font-black">Añadir Colaborador(a) al proyecto: {project.name}</h1>
      <div className="mt-10 flex justify-center">
        <FormCollaborator/>
      </div>
      {loading ? <p className='text-center'>cargando...</p> : collaborator?._id && (
        <div className='flex justify-center mt-10'>
          <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
            <h2 className='text-center mb-10 text-2xl font-bold'>Resultao:</h2>
            <div className='flex justify-between items-center'>
              <p>{collaborator.name}</p>
              <button
                type='button'
                className='bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm'
                onClick={() => addCollaborator({
                  email: collaborator.email
                })}
              >Agregar al proyecto</button>
            </div>
          </div>
        </div>
      ) }
    </>
  )
}

export default NewCollaborator;