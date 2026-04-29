import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("¡Cuenta de administrador creada!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a2e' }}>
      <div style={{ background: '#16213e', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', width: '350px', border: '1px solid #4ecca3' }}>
        <h2 style={{ color: '#4ecca3', textAlign: 'center', marginBottom: '1.5rem' }}>
          {isRegistering ? 'Registro NetAdmin' : 'Acceso Administrador'}
        </h2>
        <form onSubmit={handleAuth}>
          <input 
            type="email" placeholder="Email" 
            style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '5px', border: 'none', background: '#0f3460', color: 'white' }}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" placeholder="Contraseña" 
            style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '5px', border: 'none', background: '#0f3460', color: 'white' }}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" style={{ width: '100%', padding: '0.8rem', background: '#4ecca3', border: 'none', borderRadius: '5px', color: '#1a1a2e', fontWeight: 'bold', cursor: 'pointer' }}>
            {isRegistering ? 'Crear Usuario' : 'Entrar al Sistema'}
          </button>
        </form>
        <p 
          onClick={() => setIsRegistering(!isRegistering)} 
          style={{ color: '#4ecca3', textAlign: 'center', marginTop: '1rem', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿Nuevo admin? Regístrate aquí'}
        </p>
      </div>
    </div>
  );
};

export default Login;