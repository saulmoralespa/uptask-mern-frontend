import { formatDate } from "../helpers/formatDate";
import useProjects from "../hooks/useProjects";

const Task = ({task}) => {

  const { handleModalEditTask, handleModalDeleteTask } = useProjects();  

  const {name, description, priority, dateDelivery, _id, status} = task;

  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p className="mb-1 text-xl">{name}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
            <p className="mb-1 text-sm">{formatDate(dateDelivery)}</p>
            <p className="mb-1 text-gray-600">Prioridad: {priority}</p>
        </div>
        <div className="flex gap-4">
            <button
                className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                onClick={() => handleModalEditTask(task)}
            >Editar</button>
            {status ? (
                <button
                    className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                >Completa</button>
            ): (
                <button
                    className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                >Incompleta</button>
            )}
            <button
                className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                onClick={() => handleModalDeleteTask(task)}
            >Eliminar</button>
        </div>
    </div>
  );
}

export default Task;