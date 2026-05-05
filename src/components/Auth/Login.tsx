import React, { useState } from 'react'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password)
        alert('¡Acceso de Administrador Creado!')
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (error) {
      alert('Error en el acceso: ' + (error as Error).message)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <span style={styles.logoIcon}>🔐</span>
          </div>
          <h1 style={styles.title}>
            NETADMIN <span style={{ color: '#4ecca3' }}>HUB</span>
          </h1>
          <p style={styles.subtitle}>
            {isRegistering ? 'Registro de nuevo sistema' : 'Control de Acceso de Red'}
          </p>
        </div>

        <form onSubmit={handleAuth} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>EMAIL DEL ADMIN</label>
            <input
              type="email"
              placeholder="admin@netadmin.com"
              style={styles.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              style={styles.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            {isRegistering ? 'INICIALIZAR CUENTA' : 'AUTENTICAR SISTEMA'}
          </button>
        </form>

        <div style={styles.footer}>
          <p
            style={styles.toggleText}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? '¿Ya tienes credenciales? Iniciar Sesión'
              : '¿No tienes acceso? Solicitar registro'}
          </p>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#0a0f1e',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: '#16213e',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 0 20px rgba(78, 204, 163, 0.2)',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid rgba(78, 204, 163, 0.3)',
    textAlign: 'center',
  },
  header: { marginBottom: '30px' },
  logoContainer: { fontSize: '40px', marginBottom: '10px' },
  logoIcon: {},
  title: {
    color: '#ffffff',
    fontSize: '24px',
    letterSpacing: '2px',
    margin: '0',
    fontWeight: '800',
  },
  subtitle: { color: '#9fb2cf', fontSize: '14px', marginTop: '5px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: {
    display: 'block',
    color: '#4ecca3',
    fontSize: '11px',
    fontWeight: 'bold',
    marginBottom: '8px',
    letterSpacing: '1px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #1f4068',
    background: '#0f3460',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    background: '#4ecca3',
    color: '#1a1a2e',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 10px rgba(78, 204, 163, 0.4)',
  },
  footer: { marginTop: '25px' },
  toggleText: {
    color: '#4ecca3',
    fontSize: '13px',
    cursor: 'pointer',
    textDecoration: 'underline',
    opacity: '0.8',
  },
}

export default Login
