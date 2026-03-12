import { NavLink, useLocation } from 'react-router-dom'
import { 
  Plane, LayoutDashboard, MapPin, PlusCircle, 
  Wallet, FileText, Globe 
} from 'lucide-react'

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/trips', label: 'My Trips', icon: MapPin },
  { path: '/create-trip', label: 'Create Trip', icon: PlusCircle },
  { path: '/budget', label: 'Budget Tracker', icon: Wallet },
  { path: '/documents', label: 'Documents', icon: FileText },
]

export default function Sidebar() {
  const location = useLocation()

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
      <div className="sidebar-user">
        <div className="sidebar-user-avatar">T</div>
        <div className="sidebar-user-info">
          <h4>Traveler</h4>
          <p>Plan your adventures</p>
        </div>
      </div>
    </aside>
  )
}
