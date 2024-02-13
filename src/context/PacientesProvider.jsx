import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacienteContext = createContext()

const PacientesProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([]);
    //Este nos servira para cuando se de click a editar, entonces necesitamos ese paciente
    const [paciente, setPaciente] = useState({});
    const [editandoTexto, setEditandoTexto] = useState(false);

    const {auth} = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () =>{
            try {
                //Primero debemos obtener el TOKEN porque ahi es donde esta la informacion del id del veterinario
                const token = localStorage.getItem('token')
                if(!token) return
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/pacientes', config);
                console.log(data);
                setPacientes(data);

            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    }, [auth])

    //Nota: en vez de mandar la funcion setPacientes vamos a crear una funcion (guardarPaciente)
    const guardarPaciente = async (paciente) => {
        console.log(paciente);
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            console.log('editando');
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                console.log(data);

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log('antes de hacer post');
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config) //Lo ingresamos a la base de datos con este POST
                console.log(data);
                //NOTA: LO IDEAL ES QUE UNA VEZ QUE OBTENGAMOS LA RESPUESTA EN NUESTRO DATA, ES IDEAL COLOCARLO EN EL STATE
                //PARA ASI ALMACENARLO Y COMENZAR A ITERAR EN EL FRONT
                //Ahora bien, toda esa info que se va a la BD, ALGUNAS PROPIEDADES NO LAS REQUERIMOS EN NUESTRO STATE DE SETPACIENTES
                //Aplicando destructuring, primero colocamos las propiedades que querramos eliminar, despues creamos con el spread una variable que sera donde estaran almacenadas las propiedades restantes
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data;
                console.log(pacienteAlmacenado);
                //Ahora si eliminado los datos que no querremos vamos a colocarlo en el state
                //Lo que haya en este nuevo paciente y lo que ya habia (lo que siempre hemos hecho en proyectos anteriores)
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    //Creando funcion para el boton editar en Paciente.jsx
    const setEdicion = (paciente) => {
        console.log('editando', paciente);
        setEditandoTexto(true);
        setPaciente(paciente);
    }

    //Creando funcion para el boton eliminar en Paciente.jsx
    const eliminarPaciente = async id => {
        console.log(id);
        const confirmar = confirm('¿Deseas eliminar este paciente?')

        if(confirmar){
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                console.log(data);

                //Lo de arriba elimino en la base de datos, ahora falta en nuestro html con el state
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)
                //hicimos la comparacion con el id y no el data_id porque en data este ya fue eliminado, entonces este id solo
                //se encuentra en el FRONT por asi decirlo
                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <PacienteContext.Provider value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente,
            setEditandoTexto,
            editandoTexto
        }}>
            {children}
        </PacienteContext.Provider>
    )
}

export {
    PacientesProvider
}

export default PacienteContext;