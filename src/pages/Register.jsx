import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axios from 'axios';

const Register = () => {
  
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  const [ alert, setAlert ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([name, email, password, password].includes('')){
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    if(password !== password2){
      setAlert({
        msg: 'Los password no son iguales',
        error: true
      });
      return;
    }

    if(password.length < 6){
      setAlert({
        msg: 'El password es muy corto, agrega minimo 6 caracteres',
        error: true
      });
      return;
    }

    setAlert({});

    try{
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`,
      {
        name,
        password,
        email
      });
      setAlert({
        msg: data.msg,
        error: false
      });
      setName('');
      setEmail('');
      setPassword('');
      setPassword2('');
    }catch(error){
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
        Crea tu Cuenta y Administra tus <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alert alert={alert}/>}

      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block text-xl font-bold" 
            htmlFor="name"
            >Nombre</label>
          <input 
            type="text"
            placeholder="Tu nombre"
            name="" 
            id="name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
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
        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block text-xl font-bold" 
            htmlFor="password2"
            >Repetir Password</label>
          <input 
            type="password"
            placeholder="Password tu password"
            name="" 
            id="password2"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </div>
        <input 
          type="submit" 
          value="Crear Cuenta"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded 
          hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿ Ya tienes una cuenta ? Inicia Sesión
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

export default Register;