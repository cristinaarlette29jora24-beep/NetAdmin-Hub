import { useEffect, useState } from 'react'
import { auth } from './firebase' // <--- Importamos tu configuración de Firebase
import { onAuthStateChanged } from 'firebase/auth' // <--- El "vigilante" de la sesión
import Login from './components/Auth/Login' // <--- Importamos la pantalla de entrada

import Sidebar from './components/Layout/SidebarNEW.jsx'
import Topbar from './components/Layout/TopbarNEW.jsx'

import SubnetCalc from './components/Calculator/SubnetCalc'
import IPSubnetCalculator from './components/Calculator/IPSubnetCalculator'
import CommandList from './components/CLI/CommandList'
import AIChat from './components/AI/AIChat'

function App() {
  const [activeModule, setActiveModule] = useState('calculator')
  const [theme, setTheme] = useState('dark')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Nuevo estado para el usuario
  const [user, setUser] = useState(null)

  // 1. Efecto para controlar si hay alguien logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  // Tu efecto original del tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const renderModule = () => {
    if (activeModule === 'calculator') return <SubnetCalc />
    if (activeModule === 'subnet')     return <IPSubnetCalculator />
    if (activeModule === 'cli')        return <CommandList />
    if (activeModule === 'ai')         return <AIChat />
  }

  // 2. SI NO HAY USUARIO, mostramos la pantalla de Login
  if (!user) {
    return <Login />
  }

  // 3. SI HAY USUARIO, mostramos tu maravilloso panel
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        active={activeModule}
        onNavigate={(moduleId) => {
          setActiveModule(moduleId)
          setIsMobileMenuOpen(false)
        }}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          onToggleSidebar={() => setIsMobileMenuOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-7">
          <div className="mx-auto w-full max-w-7xl fade-in-up">
            {/* Mensaje de bienvenida con el email del usuario */}
            <p className="text-xs text-blue-400 mb-2">Admin: {user.email}</p>
            {renderModule()}
          </div>
        </main>
        <footer
          className="px-4 py-3 text-xs text-center"
          style={{
            background: '#0a0f1e',
            borderTop: '1px solid rgba(59,130,246,0.65)',
            color: '#9fb2cf',
          }}
        >
          © 2026 Trinidad - Todos los derechos reservados
        </footer>
      </div>
    </div>
  )
}

export default App