import React, { useState } from 'react';
import app from '../firebase.config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    const auth = getAuth(app);
    try {
      if (!username || !password) {
        alert("Por favor, ingresa un correo electrónico y una contraseña.");
        return;
      }else if (signInWithEmailAndPassword(auth, username, password)){
        window.location.href = "/home";
      }else {
        alert("Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.");
      }
      
    } catch (error) {
      alert("Error Inesperado");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-4 bg-gray-100 shadow-md rounded-lg overflow-hidden">
        <div className="bg-red-700 flex flex-col items-center justify-center py-8">
          <img src="/user.png" alt="Logo" className="w-20 h-20 mb-4" />
          <h1 className="text-white text-2xl font-bold">LOGIN</h1>
        </div>
        <div className="p-8">
          <img src="/parking.png" alt="Logo" className="w-16 h-16 mb-4" />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <a href="https://www.google.com" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
              Forgot your password?
            </a>
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;