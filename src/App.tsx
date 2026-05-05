import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { auth } from './firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import Login from './components/Auth/Login'
import Sidebar from './components/Layout/SidebarNEW'
import Topbar from './components/Layout/TopbarNEW'
import SubnetCalc from './components/Calculator/SubnetCalc'
import IPSubnetCalculator from './components/Calculator/IPSubnetCalculator'
import CommandList from './components/CLI/CommandList'
import AIChat from './components/AI/AIChat'
import NotFoundPage from './pages/NotFoundPage'
import type { ModuleId } from './types'

function Dashboard() {
  const [activeModule, setActiveModule] = useState<ModuleId>('calculator')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { currentUser } = auth

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const renderModule = () => {
    if (activeModule === 'calculator') return <SubnetCalc />
    if (activeModule === 'subnet')     return <IPSubnetCalculator />
    if (activeModule === 'cli')        return <CommandList />
    if (activeModule === 'ai')         return <AIChat />
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        active={activeModule}
        onNavigate={(id: ModuleId) => { setActiveModule(id); setIsMobileMenuOpen(false) }}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar
          theme={theme}
          onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          onToggleSidebar={() => setIsMobileMenuOpen(p => !p)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-7">
          <div className="mx-auto w-full max-w-7xl fade-in-up">
            <p className="text-xs text-blue-400 mb-2">Admin: {currentUser?.email}</p>
            {renderModule()}
          </div>
        </main>
        <footer className="px-4 py-3 text-xs text-center"
          style={{ background: '#0a0f1e', borderTop: '1px solid rgba(59,130,246,0.65)', color: '#9fb2cf' }}>
          © 2026 Trinidad - Todos los derechos reservados
        </footer>
      </div>
    </div>
  )
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false) })
    return () => unsub()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: '#0a0f1e' }}>
      <div className="text-blue-400">Cargando...</div>
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/"      element={user  ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*"      element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App