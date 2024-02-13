import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import axios from 'axios';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});


  const params = useParams();
  const {id} = params;

  useEffect(()=>{
    const confirmarCuenta = async () => {
      try {
        const url = `veterinarios/confirmar/${id}`
        console.log(url);
        //Usamos destructuring para de una vez IRNOS DIRECTAMENTE HACIA DATA Y VER EL MSG
        // const {data} = await axios(url)
        const {data} = await clienteAxios(url)
        console.log(data);
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })
        
      } catch (error) {
        console.log(error);
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })

      }

      setCargando(false);
    }

    confirmarCuenta();
  }, [])
  
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-5xl'>
            Confirma tu Cuenta y Administra tus <span className='text-black'>Pacientes</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {!cargando && <Alerta alerta={alerta}/>} {/* PARA CUANDO TERMINE DE CARGAR MOSTRAR LA ALERTA */}
            {cuentaConfirmada && (
              <Link className='block text-center my-5 text-gray-500' to="/">Iniciar Sesion</Link>
            )}
      </div>
    </>
  )
}

export default ConfirmarCuenta