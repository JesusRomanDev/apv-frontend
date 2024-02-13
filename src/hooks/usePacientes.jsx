//EL USE CONTEXT A DIFERENCIA DEL AuthProvider/AuthContext (estan relacionados) ESTE ES CON EL QUE SE VAN A EXTRAER LOS DATOS
import {useContext} from 'react'
import PacienteContext from '../context/PacientesProvider';

const usePacientes = () => {
    return useContext(PacienteContext)
}

export default usePacientes;