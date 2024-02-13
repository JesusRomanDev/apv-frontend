import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> NOTA: SE QUITO EL MODO ESTRICTO PORQUE NOS DABA ERROR AL CONFIRMAR EL EMAIL, VER MAS EN EL VIDEO 526
  //CONFIRMANDO CUENTA DEL USUARIO, nos aparecia USUARIO CONFIRMADO CORRECTAMENTE LUEGO AL INSTANTE NOS DECIA TOKEN NO VALIDO
  //ENTONCES PARA ESO SE QUITO EL MODO ESTRICTO
    <App />
  //</React.StrictMode>,
)
