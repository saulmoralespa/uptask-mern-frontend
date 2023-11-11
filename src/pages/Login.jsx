import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes('')){
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, 
      {
        email,
        password
      });
      setAlert({});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/projects');
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
        Inicia sesión y administra tus <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alert alert={alert}/>}
      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
        >
        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block text-xl font-bold" 
            htmlFor="email"
            >Email</label>
          <input 
            type="email"
            placeholder="Email de Registro"
            name="" 
            id="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block text-xl font-bold" 
            htmlFor="password"
            >Password</label>
          <input 
            type="password"
            placeholder="Password de Registro"
            name="" 
            id="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input 
          type="submit" 
          value="Login In"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded 
          hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/register"
        >
          ¿ No tienes una cuenta ? Regístrate
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/lost-password"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  )
}

export default Login;