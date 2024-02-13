import React, { useEffect, useState } from 'react'
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes'; //usePacientes es de donde se extrae lo que tiene PacientesProvider

const Formulario = () => {
    //Nombrando los states con el mismo nombre que tiene nuestra API / Schema (el archivo Paciente.js)
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    //Nota: el state de Veterinario no se va a agregar, ese lo va a tomar el servidor de la sesion que este abierta

    const [id, setId] = useState(null);

    const[alerta, setAlerta] = useState({});

    //Usando el customHook
    const {guardarPaciente, paciente, setEditandoTexto, editandoTexto} = usePacientes();
    console.log(paciente);

    //Usando useEffect para cuando demos click en editar algun paciente (se nos llena el obj paciente), se nos llene el formulario
    useEffect(() => {
        if(paciente?.nombre){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(new Date(paciente.fecha).toISOString());
            setSintomas(paciente.sintomas);
            setId(paciente._id) //tambien se le agrega el id para que no se pierda y siga siendo el mismo, asi como para que el boton de agregar paciente, sea dinamico y pueda estar el texto entre 'Guardar Cambios' o 'Agregar Paciente
        }

    }, [paciente])


    const handleSubmit = e => {
        e.preventDefault();

        //Validar el Formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son Obligatorios',
                error: true
            })
            return;
        }
        if(id){
            setEditandoTexto(false);
            //Nota: hay que recordar que al momento de guardar el paciente creado, este contara con una propiedad adicional
            //que es por el cual veterinario fue creado, esto se especifico en authMiddleware.js
            console.log('antes de guardando');
            guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
            setAlerta({
                msg: 'Guardado Correctamente'
            })
            setTimeout(() => {
                setAlerta({
                    msg: ''
                })
            }, 2000);
            setNombre('');
            setPropietario('');
            setEmail('');
            setFecha('');
            setSintomas('');
            setId('');
        }else{
                        //Nota: hay que recordar que al momento de guardar el paciente creado, este contara con una propiedad adicional
            //que es por el cual veterinario fue creado, esto se especifico en authMiddleware.js
            console.log('antes de guardando');
            guardarPaciente({nombre, propietario, email, fecha, sintomas})
            setAlerta({
                msg: 'Guardado Correctamente'
            })
            setTimeout(() => {
                setAlerta({
                    msg: ''
                })
            }, 2000);
            setNombre('');
            setPropietario('');
            setEmail('');
            setFecha('');
            setSintomas('');
            setId('');
        }
    }

    const {msg} = alerta;
    return (
    <>
        <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>
        <p className='text-xl mt-5 mb-10 text-center'>
            Añade tus pacientes y {''}
            <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>

        <form className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md mt-5' onSubmit={handleSubmit}>
            <div className='mb-5'>
                <label htmlFor="nombre" className='text-gray-700 uppercase font-bold'>Nombre Mascota</label>
                <input type="text" id='nombre' placeholder='Nombre de la Mascota' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>

            <div className='mb-5'>
                <label htmlFor="propietario" className='text-gray-700 uppercase font-bold'>Nombre Propietario</label>
                <input type="text" id='propietario' placeholder='Nombre del Propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={propietario} onChange={e => setPropietario(e.target.value)} />
            </div>

            <div className='mb-5'>
                <label htmlFor="email" className='text-gray-700 uppercase font-bold'>Email Propietario</label>
                <input type="email" id='email' placeholder='Email del Propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className='mb-5'>
                <label htmlFor="fecha" className='text-gray-700 uppercase font-bold'>Fecha Alta</label>
                <input type="date" id='fecha' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={fecha} onChange={e => setFecha(e.target.value)} />
            </div>

            <div className='mb-5'>
                <label htmlFor="sintomas" className='text-gray-700 uppercase font-bold'>Sintomas</label>
                <textarea placeholder='Describe los sintomas' id='sintomas' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={sintomas} onChange={e => setSintomas(e.target.value)}/>
            </div>

            <input type="submit" value={editandoTexto ? 'Guardar Cambios' : 'Agregar Paciente'} className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors' />
        </form>

        {msg && <Alerta alerta={alerta} />}
    </>
  )
}

export default Formulario