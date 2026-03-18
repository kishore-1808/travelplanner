import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Trips from './pages/Trips'
import CreateTrip from './pages/CreateTrip'
import Budget from './pages/Budget'
import Documents from './pages/Documents'
import Auth from './pages/Auth'
import { useAuth } from './hooks/useStore'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

export default function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className={isAuthenticated ? "app-layout" : "auth-layout"}>
      {isAuthenticated && <Sidebar />}
      <main className={isAuthenticated ? "main-content" : "auth-content"}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/trips" element={<PrivateRoute><Trips /></PrivateRoute>} />
          <Route path="/create-trip" element={<PrivateRoute><CreateTrip /></PrivateRoute>} />
          <Route path="/budget" element={<PrivateRoute><Budget /></PrivateRoute>} />
          <Route path="/documents" element={<PrivateRoute><Documents /></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  )
}
