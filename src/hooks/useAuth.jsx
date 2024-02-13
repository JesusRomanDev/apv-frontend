//EL USE CONTEXT A DIFERENCIA DEL AuthProvider/AuthContext (estan relacionados) ESTE ES CON EL QUE SE VAN A EXTRAER LOS DATOS
import {useContext} from 'react'
import AuthContext from '../context/AuthProvider'

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;