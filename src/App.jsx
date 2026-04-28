import { useEffect, useState } from 'react'
import Sidebar from './components/Layout/Sidebar'
import Topbar from './components/Layout/Topbar'
import SubnetCalc from './components/Calculator/SubnetCalc'
import IPSubnetCalculator from './components/Calculator/IPSubnetCalculator'
import CommandList from './components/CLI/CommandList'
import AIChat from './components/AI/AIChat'

function App() {
  const [activeModule, setActiveModule] = useState('calculator')
  const [theme, setTheme] = useState('dark')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const renderModule = () => {
    if (activeModule === 'calculator') return <SubnetCalc />
    if (activeModule === 'subnet')     return <IPSubnetCalculator />
    if (activeModule === 'cli')        return <CommandList />
    if (activeModule === 'ai')         return <AIChat />
  }

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