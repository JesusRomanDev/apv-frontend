import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
//Importamos useAuth porque una vez que hacemos login, en nuestro Provider se quedo registrado los datos del Admin, entonces eso nos servira para llenar los campos de editar perfil, en este caso el objeto auth es el que cuenta con esa informacionS
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {
    const {auth, actualizarPerfil} = useAuth();
    //Creamos un state para modificarlo aqui localmente y no en el Provider/Context
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState(false)
    console.log(auth);

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const {nombre, email} = perfil;
        if([nombre, email].includes('')){
            setAlerta({
                msg: 'Email y Nombre son obligatorios',
                error: true
            })
            return
        }

        const resultado = await actualizarPerfil(perfil);
        console.log(resultado);

        setAlerta(resultado);
    }

    const {msg} = alerta;
  
    return (
    <>
        <AdminNav />

        <h2 className='font-black text-3xl text-center mt-10'>Editar Perfil</h2>
        <p className='text-xl mt-5 mb-10 text-center'>Modifica tu {''} 
            <span className='text-indigo-600 font-bold '>Informacion aqui</span>
        </p>

        <div className='flex justify-center'>
            <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>

                {msg && <Alerta alerta={alerta} />}

                <form onSubmit={handleSubmit}>
                    <div className='my-3'>
                        <label className='uppercase font-bold text-gray-600'>Nombre</label>
                        <input type="text" className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='nombre' 
                        value={perfil.nombre || ''}
                        onChange={e =>setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}/> {/* Nota guardada en el curso como "Sintaxis de objeto como las computadas de objetos" */}
                    </div>

                    <div className='my-3'>
                        <label className='uppercase font-bold text-gray-600'>Sitio Web</label>
                        <input type="text" className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='web' 
                        value={perfil.web || ''} /* web inicia como null */
                        onChange={e =>setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}/>
                    </div>
                    
                    <div className='my-3'>
                        <label className='uppercase font-bold text-gray-600'>Telefono</label>
                        <input type="text" className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='telefono' 
                        value={perfil.telefono || ''} /* telefono inicia como null */
                        onChange={e =>setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}/>
                    </div>
                    
                    <div className='my-3'>
                        <label className='uppercase font-bold text-gray-600'>Email</label>
                        <input type="text" className='border bg-gray-50 w-full p-2 mt-5 rounded-lg' name='email' 
                        value={perfil.email || ''}
                        onChange={e =>setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}/>
                    </div>

                    <input type="submit" value="Guardar Cambios" className='bg-indigo-700 cursor-pointer px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5' />
                </form>
            </div>
        </div>
    </>
  )
}

export default EditarPerfil