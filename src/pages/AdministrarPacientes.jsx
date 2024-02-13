import React, { useState } from 'react'
import Formulario from '../components/Formulario'
import ListadoPacientes from '../components/ListadoPacientes'


const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  //Nota: en el button podemos hacer que en dispositivos mas grandes desaparezca, pero en pequeños podemos hacerlo condicional 
  //en dependiendo como este el estado de mostrarFormulario y asi mostrar diferente texto
  //A diferencia del div que contiene formulario que de plano es dependiendo le state de mostrarFormulario ponmelo o quitamelo
  //Nada de tener un texto diferente
  return (
    <div className='flex flex-col md:flex-row'>
      <button type='button' className='bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-5 md:hidden' onClick={() => setMostrarFormulario(!mostrarFormulario)}>{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button> {/* lo contrario de mostrarFormulario !!!!!!!!!! */}
      <div className={` ${mostrarFormulario ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>

      <div className='md:w-1/2 lg:w-3/5'>
        <ListadoPacientes />
      </div>

    </div>
  )
}

export default AdministrarPacientes