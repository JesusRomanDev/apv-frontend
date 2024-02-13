import React from 'react'
import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente';

const ListadoPacientes = () => {

  //Aunque lo extraigamos como objeto, este seguira siendo un array, tal cual lo declaramos en el useState de PacientesProvider.jsx
  const {pacientes} = usePacientes();
  console.log(pacientes);
  console.log(pacientes.length);

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className='font-black text-3xl text-center'>Listado Pacientes</h2>

          <p className='text-xl mt-5 mb-10 text-center'>
            Administra tus {''}
            <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
          </p>

          {/* Hay que recordar que necesitamos un key cuando estemos iterando con MAP */}
          {/* Ahora bien, IMPORTANTE, AUNQUE CON NUESTRO CONTEXT TENGAMOS A [PACIENTES] Y PODAMOS USARLO EN TODAS PARTES, COMO AQUI ESTAMOS ITERANDOOOOOO, ENTONCES SE DEBE PASAR POR PROPS EL ELEMENTO DE ITERACION ( paciente=> ) HACIA EL COMPONENTE Paciente.jsx */}
          {pacientes.map(paciente => (
            <Paciente paciente={paciente} key={paciente._id} />
          ))}
        </> 
      ) : (
        <>
          <h2 className='font-black text-3xl text-center'>No Hay Pacientes</h2>

          <p className='text-xl mt-5 mb-10 text-center'>
            Comienza agregando pacientes {''}
            <span className='text-indigo-600 font-bold'>y apareceran en este lugar</span>
          </p>
        </>)}
    </>
  )
}

export default ListadoPacientes