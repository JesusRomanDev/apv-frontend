//El authProvider nos sirve para poder tener states en todos nuestras rutas (App)
//ESTO ES DONDE VAN A VIVIR LOS DATOS
import {useState, useEffect, createContext} from 'react'
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    //Este state de abajo nos sirve para nuestra RutaProtegida.jsx para que al momento de cargar e identificar el token y en teoria nos de acceso no nos reedireccione a la pagina principal ("/"), esto pasa porque al inicio es un objeto vacio y se tarda en checar nuestro token y darnos el perfil y ya una vez entonces no llena el objeto auth de arriba, pero para esto ya nos habria redireccionado a "/" entonces el state de abajo nos servira para prevenir eso
    const [cargando, setCargando] = useState(true);
    console.log('desde Auth Provider');

    useEffect(()=>{
        console.log('probando');
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            console.log(token);
            // if(!token) return //comprobamos que haya un token antes de enviar el request hacia nuestra API
            if(!token){
                setCargando(false)
                return
            }
            console.log('Si hay token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                //Intentando hacer la peticion hacia la URL DE PERFIL
                //Como lo de abajo sera un tipo get, el segundo parametro sera la configuracion
                //En cambio en POST, va la URL, los datos y la configuracion
                const {data} = await clienteAxios('/veterinarios/perfil', config) //no se le pone .get porque ya esta predeterminada, en cambio si fuera POST, si se pone

                console.log(data);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setCargando(false);
        }
        autenticarUsuario();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({})
    }

    console.log(auth);

    const actualizarPerfil = async (datos) => {
        console.log(datos);
        const token = localStorage.getItem('token')
        console.log(token);
        if(!token){
            setCargando(false)
            return
        }
        console.log('Si hay token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config);
            console.log(data);
            return{
                msg: 'Almacenado Correctamente'
            }
        } catch (error) {
            console.log(error.response);
            return{
                msg: error.response.data.msg,
                error:true
            }
        }

    }

    const guardarPassword = async (datos) => {
        console.log(datos);
        const token = localStorage.getItem('token')
        console.log(token);
        if(!token){
            setCargando(false)
            return
        }
        console.log('Si hay token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/actualizar-password`
            const {data} = await clienteAxios.put(url, datos, config);
            console.log(data);
            return {
                msg: data.msg
            }
        } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider             
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >

            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext