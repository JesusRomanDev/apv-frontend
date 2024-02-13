import React from 'react'
//Importando nuestra funcion usePacientes para poder usar la funcion setEdicion de PacientesProvider.jsx
import usePacientes from '../hooks/usePacientes';

const Paciente = ({paciente}) => {
    console.log(paciente);
    const {setEdicion, eliminarPaciente} = usePacientes();

    const {email, fecha, nombre, propietario, sintomas, _id} = paciente;

    console.log(fecha);

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
    }
  return (
    <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-md'>
        <p className='font-bold uppercase text-indigo-800 my-2'>Nombre: {''}
            <span className='font-normal normal-case  text-black'>{nombre}</span>
        </p>

        <p className='font-bold uppercase text-indigo-800 my-2'>Propietario: {''}
            <span className='font-normal normal-case  text-black'>{propietario}</span>
        </p>
        
        <p className='font-bold uppercase text-indigo-800 my-2'>Email Contacto: {''}
            <span className='font-normal normal-case  text-black'>{email}</span>
        </p>
        
        <p className='font-bold uppercase text-indigo-800 my-2'>Fecha de Alta: {''}
            <span className='font-normal normal-case  text-black'>{formatearFecha(fecha)}</span>
        </p>
        
        <p className='font-bold uppercase text-indigo-800 my-2'>Sintomas: {''}
            <span className='font-normal normal-case  text-black'>{sintomas}</span>
        </p>

        <div className='flex justify-between my-5'>
            <button type='button' className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg' onClick={() => setEdicion(paciente)}>Editar</button>
            {/* NOTA: AQUI ARRIBA CUANDO DAMOS ONCLICK, JavaScript YA SABE A QUE OBJETO SE LE ESTA DANDO CLICK, ANTES TENIAMOS setEdicion(_id) para poder ver cual era el ID y asi pasarlo al Provider y poder filtrar en todo el arreglo y agarrar el que fuera igual al ID, pero para ahorrarnos ese proceso de filtrado e iteracion, PUES OBVIAMENTE ONCLICK YA NOS HIZO LA CHAMBA, YA ITERAMOS, NO ES NECESARIO VOLVER A ITERAR, ESO ES PORQUE YA UBICO CUAL ES EL OBJETO DE TODOS LOS QUE HAY, ENTONCES LE PASAMOS MEJOR TODO ESE OBJETO COMO ARGUMENTO A setEdicion */}

            <button type='button' className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg' onClick={() => eliminarPaciente(_id)}>Eliminar</button>
        </div>
    </div>
  )
}

export default Paciente