import { useState } from 'react'
import Sidebar from './components/Layout/Sidebar'
import Topbar from './components/Layout/Topbar'
import SubnetCalc from './components/Calculator/SubnetCalc'
import IPSubnetCalculator from './components/Calculator/IPSubnetCalculator'
import CommandList from './components/CLI/CommandList'
import AIChat from './components/AI/AIChat'

function App() {
  const [activeModule, setActiveModule] = useState('calculator')

  const renderModule = () => {
    if (activeModule === 'calculator') return <SubnetCalc />
    if (activeModule === 'subnet')     return <IPSubnetCalculator />
    if (activeModule === 'cli')        return <CommandList />
    if (activeModule === 'ai')         return <AIChat />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar active={activeModule} onNavigate={setActiveModule} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-7">
          <div className="mx-auto w-full max-w-7xl">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App