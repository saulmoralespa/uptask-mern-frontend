import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert';

const ConfirmAccount = () => {
  
  const [ alert, setAlert ] = useState({});
  const [ accountConfirm, setAccountConfirm ] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try{
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/confirm/${id}`;
        const { data } = await axios(url);
        setAlert({
          msg: data.msg,
          error: false
        });
        setAccountConfirm(true);
      }catch(error){
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
        console.log(error);
      }
    }
    confirmAccount();
  }, []);

  const { msg } = alert;
  
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y Comienza a crear tus <span className="text-slate-700">proyectos</span>
      </h1>
      <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alert alert={alert} />}
        {accountConfirm && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount;