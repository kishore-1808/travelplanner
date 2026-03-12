import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Trips from './pages/Trips'
import CreateTrip from './pages/CreateTrip'
import Budget from './pages/Budget'
import Documents from './pages/Documents'

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      </main>
    </div>
  )
}
