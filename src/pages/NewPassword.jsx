import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";

const NewPassword = () => {
  
  const [password, setPassword] = useState('');
  const [tokenValid, setTokenValid] = useState(false);
  const [alert, setAlert] = useState({});
  const [passwordModified, setPasswordModified] = useState(false);
  
  const { token } = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axios(`${import.meta.env.VITE_BACKEND_URL}/api/users/lost-password/${token}`);
        setTokenValid(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }
    }
    checkToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if(password.length < 6){
      setAlert({
        msg: 'El password debe ser mínimo de 6 caracteres',
        error: true
      });
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/lost-password/${token}`,
      {
        password
      });
      setAlert({
        msg: data.msg,
        error: false
      });
      setPasswordModified(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alert;
  
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password y no pierdas acceso a tus <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alert alert={alert}/>}
      {tokenValid && (
        <form 
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
          >
          <div className="my-5">
            <label 
              className="uppercase text-gray-600 block text-xl font-bold" 
              htmlFor="password"
              >Nuevo Password</label>
            <input 
              type="password"
              placeholder="Escribe tu nuevo Password"
              name="" 
              id="password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input 
            type="submit" 
            value="Guardar Nuevo Password"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded 
            hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
      </form>
      )}
      {passwordModified && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicia Sesión
          </Link>
        )}
    </>
  )
}

export default NewPassword;