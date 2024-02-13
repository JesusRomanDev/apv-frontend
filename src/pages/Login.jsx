import React, { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const {setAuth} = useAuth();

    const navigate = useNavigate();

    const {msg} = alerta;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Iniciando sesion');

        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        try {
            const {data} = await clienteAxios.post('/veterinarios/login', {email, password})
            console.log(data); //nos arroja el token de autenticacion
            localStorage.setItem('token', data.token);
            // console.log(data);
            //NOTA SUPER IMPORTANTE: HABRA 2 SETAUTH(DATA) UNO AQUI ABAJO Y EL OTRO EN AUTHPROVIDER, PARA QUE ES ESTO?
            //ESTO NOS SIRVE, EL PRIMERO QUE ES EL DE ABAJO, PARA PODER SETEAR LOS DATOS EN EL LOGIN Y REDIRECCIONARNOS A ADMIN
            //PORQUE SI NO PONEMOS EL SETAUTH(DATA) AQUI EN EL LOGIN JAMAS PODREMOS IR A LA PESTAÑA ADMIN ESTO ES PORQUE AUN NO HAY 
            //DATOS PARA MANDARLE A LA RUTA PROTEGIDA QUE ES LA QUE NOS DARA ACCESO A ESE COMPONENTE
            // {auth?._id ? ( 
            //     <main className='container mx-auto mt-10'>
            //         <Outlet /> 
            //     </main>) : <Navigate to="/" />}
            //EL CODIGO DE ARRIBA NOS DICE QUE SI AUTH._ID TIENE ALGO MUESTRA LA PAGINA SINO NOS REDIRECCIONA AL INICIO(LOGIN)
            //ENTONCES COMO AUN NO MANDAMOS NADA EN EL LOGIN PUES CUANDO NOS MANDE A RUTA PROTEGIDA NO HABRA NINGUN DATO PARA DARNOS
            //ACCESO A ESE ADMIN
            //EL SEGUNDO DEL AUTHPROVIDER ES PARA QUE CUANDO HAGAMOS REFRESH EN LA PAGINA DE ADMIN, ESTE IDENTIFIQUE EL BEARER TOKEN
            //Y NO NOS SAQUE DE LA SESION
            setAuth(data);
            navigate('/admin') //se va a ruta protegida
            console.log('Navegando');
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

  return (
    <>
        <div>
            <h1 className='text-indigo-600 font-black text-5xl'>
                Inicia Sesion y Administra tus <span className='text-black'>Pacientes</span>
            </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

            {msg && <Alerta alerta={alerta} />}
            
            <form onSubmit={handleSubmit}>
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

                <input type="submit" value="Iniciar Sesion" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto ' />
            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link className='block text-center my-5 text-gray-500' to="/registrar">¿No tienes una cuenta? Registrate</Link>
                <Link className='block text-center my-5 text-gray-500' to="/olvide-password">Olvide mi Password</Link>
            </nav>
        </div>
    </>
  )
}

export default Login