import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({}); 
    //El state de abajo es para mostrar el formulario si es que el token es valido
    const [tokenValido, setTokenValido] = useState(false); 
    const [passwordModificado, setPasswordModificado] = useState(false); 

    const params = useParams();
    console.log(params); //nos muestra el token que viene en la URL

    const {token} = params;
    useEffect(()=>{
        const comprobarToken = async () =>{
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`)
                setAlerta({
                    msg: 'Coloca tu Nuevo Password'
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un Error con el enlace', //o tambien puede ser error.response.data.msg, para tomar la respuesta del server
                    error: true
                })
            }
        }

        comprobarToken();
    }, [])

    const {msg} = alerta;

    const handleSubmit = async (e) => {
        console.log(password);
        e.preventDefault();
        if(password.length < 6){
            setAlerta({
                msg: 'El Password debe ser minimo de 6 caracteres',
                error: true
            })
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`
            const {data} = await clienteAxios.post(url, {password})

            console.log(data);
            setAlerta({
                msg: data.msg
            })
            setPasswordModificado(true)
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
                Reestablece tu Password y no pierdas acceso a tus <span className='text-black'>Pacientes</span>
            </h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {msg && <Alerta alerta={alerta} />}

            {tokenValido && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className='my-5'>
                            <label className='uppercase text-gray-600 block text-xl font-bold'>Nuevo Password</label>
                            <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Tu Nuevo Password'
                            value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>

                        <input type="submit" value="Reestablecer Password" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto ' />
                    </form>

                    {passwordModificado && <Link className='block text-center my-5 text-gray-500' to="/">Inicia Sesion</Link>}
                </>
            )}
        </div>
    </>
  )
}

export default NuevoPassword