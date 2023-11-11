import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import Alert from './Alert';

const FormProject = () => {
    
  const [id, setId] = useState(null);  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateDelivery, setDateDelivery] = useState('');
  const [customer, setCustomer] = useState('');
  const params = useParams();

  const { showAlert, alert, submitProject, project } = useProjects();

  useEffect(() => {
    if(params.id){
        setId(project._id);
        setName(project.name);
        setDescription(project.description);
        setDateDelivery(project.dateDelivery?.split('T')[0]);
        setCustomer(project.customer);
    }
  }, [params]);

  const handleSubmit = async e => {
    e.preventDefault();

    if([name, description, dateDelivery, customer].includes('')){
        showAlert({
            msg: 'Todos los campos son obligatorios',
            error: true
        });

        return;
    }

    await submitProject({id, name, description, dateDelivery, customer});
    setName(null);
    setName('');
    setDescription('');
    setDateDelivery('');
    setCustomer('');
  }

  const { msg } = alert;

  return (
    <form 
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
        onSubmit={handleSubmit}
    >
        {msg && <Alert alert={alert}/>}
        <div className='mb-5'>
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="name"
            >Nombre Proyecto</label>
            <input 
                type="text" 
                name="" 
                id="name"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Nombre del Proyecto"
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="description"
            >Descripción</label>
            <textarea
                name="" 
                id="description"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Descripción del Proyecto"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="date-delivery"
            >Fecha de entrega</label>
            <input
                type="date"
                name="" 
                id="date-delivery"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={dateDelivery}
                onChange={e => setDateDelivery(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label
                className="text-gray-700 uppercase font-bold text-sm"
                htmlFor="customer"
            >Nombre Cliente</label>
            <input 
                type="text" 
                name="" 
                id="customer"
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Nombre del Cliente"
                value={customer}
                onChange={e => setCustomer(e.target.value)}
            />
        </div>
        <input 
            type="submit" 
            value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
            className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
    </form>
  )
}

export default FormProject;