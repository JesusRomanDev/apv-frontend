import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando');
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Hay Campos Vacios', error: true})
      return;
    }

    if(password !== repetirPassword){
      setAlerta({msg: 'Los Passwords no son iguales', error: true})
      return;
    }

    if(password.length < 6){
      setAlerta({msg: 'El Password es muy corto, agrega minimo 6 caracteres', error: true})
      return;
    }

    setAlerta({});

    //Crear el usuario en la API
    try {
      //Añadiendole la url de ThunderClient de Registar Veterinario
      // const url = 'http://localhost:4000/api/veterinarios'
      //Ahora ya con los env de nuestro frontend
      const url = `/veterinarios`
      //Pudimos usar fetch o axios, en  este caso le instalamos y trabajaremos con axios
      // const respuesta = await axios.post(url, {nombre, email, password})
      const respuesta = await clienteAxios.post(url, {nombre, email, password})
      console.log(respuesta);
      setAlerta({
        msg: 'Creado Correctamente, revisa tu email',
        error: false
      })
    } catch (error) {
      //Este error.response viene del backend, donde dentro de las propiedades de ese objeto hay una que es DATA
      console.log(error.response);
      setAlerta({
        //Dentro de data esta el new Error de nuestro BACKEND, entonces hay que acceder a esas propiedades del error del backend
        //para mostrar el mensaje que colocamos al tener ese tipo de error
        msg: error.response.data.msg, //nos imprimira usuario ya registrado en caso de que el correo sea el mismo por ejemplo
        error: true
      })
    }

  }

  //OBJETO EN EL RETURN
  //OBJETO EN EL RETURN
  //OBJETO EN EL RETURN
  //OBJETO EN EL RETURN
  //OBJETO EN EL RETURN
  //OBJETO EN EL RETURN
  //OBJETO EN EL RETURN
  //OBJETO EN EL RETURN
  //OBJETO EN EL RETURN
  //OBJETO EN EL RETURN
  //OBJETO EN EL RETURN
  //OBJETO EN EL RETURN
  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-5xl'>
            Crea tu Cuenta y Administra tus <span className='text-black'>Pacientes</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {msg && <Alerta alerta={alerta} />}
            <form onSubmit={handleSubmit}>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label> 
                    <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="text" placeholder='Tu Nombre'
                    value={nombre} onChange={e => setNombre(e.target.value)}/>
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                    <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="email" placeholder='Email de Registro'
                    value={email} onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                    <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Tu Password'
                    value={password} onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Repetir Password</label>
                    <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Repite tu Password'
                    value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}/>
                </div>

                <input type="submit" value="Crear Cuenta" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto ' />
            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link className='block text-center my-5 text-gray-500' to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
                <Link className='block text-center my-5 text-gray-500' to="/olvide-password">Olvide mi Password</Link>
            </nav>
      </div>

    </>
  )
}

export default Registrar