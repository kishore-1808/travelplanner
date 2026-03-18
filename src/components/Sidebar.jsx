import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { 
  Plane, LayoutDashboard, MapPin, PlusCircle, 
  Wallet, FileText, Globe, LogOut 
} from 'lucide-react'
import { useAuth } from '../hooks/useStore'

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/trips', label: 'My Trips', icon: MapPin },
  { path: '/create-trip', label: 'Create Trip', icon: PlusCircle },
  { path: '/budget', label: 'Budget Tracker', icon: Wallet },
  { path: '/documents', label: 'Documents', icon: FileText },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Plane size={22} />
        </div>
        <div className="sidebar-logo-text">
          <h1>Wanderlust</h1>
          <span>Travel Planner</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Menu</div>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end={item.path === '/'}
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Quick Action */}
      <div className="sidebar-quick-action">
        <h4>Next Trip</h4>
        <p>No upcoming trips</p>
      </div>

      {/* User Profile */}
      <div className="sidebar-user" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="sidebar-user-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="sidebar-user-info">
            <h4>{user?.name || 'Traveler'}</h4>
            <p style={{ fontSize: '0.8rem', opacity: 0.8, maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.email || 'Plan your adventures'}
            </p>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          title="Logout" 
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '5px' }}
        >
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  )
}
