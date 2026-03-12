import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, MapPin, Calendar, IndianRupee, Globe, Filter } from 'lucide-react'
import { useTrips } from '../hooks/useStore'

export default function Trips() {
  const { trips, deleteTrip } = useTrips()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const filteredTrips = useMemo(() => {
    let result = [...trips]

    // Search filter
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        (t.name || '').toLowerCase().includes(q) ||
        (t.destination || '').toLowerCase().includes(q)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(t => t.status === statusFilter)
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.startDate || b.createdAt) - new Date(a.startDate || a.createdAt)
        case 'oldest':
          return new Date(a.startDate || a.createdAt) - new Date(b.startDate || b.createdAt)
        case 'budget-high':
          return (parseFloat(b.budget) || 0) - (parseFloat(a.budget) || 0)
        case 'budget-low':
          return (parseFloat(a.budget) || 0) - (parseFloat(b.budget) || 0)
        default:
          return 0
      }
    })

    return result
  }, [trips, search, statusFilter, sortBy])

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">My Trips</h1>
            <p className="page-subtitle">All your adventures in one place.</p>
          </div>
          <Link to="/create-trip" className="btn btn-primary">
            <Plus size={18} />
            Plan New Trip
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search />
          <input
            type="text"
            className="search-input"
            placeholder="Search trips by name or destination..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="trip-search"
          />
        </div>
        <select
          className="form-select"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ width: 160 }}
          id="status-filter"
        >
          <option value="all">All Statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <select
          className="form-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ width: 200 }}
          id="sort-filter"
        >
          <option value="newest">Start Date (Newest)</option>
          <option value="oldest">Start Date (Oldest)</option>
          <option value="budget-high">Budget (High to Low)</option>
          <option value="budget-low">Budget (Low to High)</option>
        </select>
      </div>

      {/* Trip Cards */}
      {filteredTrips.length > 0 ? (
        <div className="grid-3">
          {filteredTrips.map(trip => (
            <div key={trip.id} className="trip-card">
              <div className="trip-card-image" style={trip.imageUrl ? { background: `url(${trip.imageUrl}) center/cover no-repeat`, color: 'transparent' } : {}}>
                {!trip.imageUrl && <MapPin size={48} />}
              </div>
              <div className="trip-card-body">
                <h3>{trip.name || trip.destination}</h3>
                <p>{trip.description || trip.destination}</p>
                <div className="trip-card-meta">
                  <span>
                    <MapPin size={14} />
                    {trip.destination}
                  </span>
                  <span>
                    <Calendar size={14} />
                    {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : '—'}
                  </span>
                  <span>
                    <IndianRupee size={14} />
                    ₹{parseFloat(trip.budget || 0).toLocaleString()}
                  </span>
                </div>
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      background: trip.status === 'completed' ? 'var(--success-bg)' : trip.status === 'ongoing' ? 'var(--orange-bg)' : 'var(--primary-bg)',
                      color: trip.status === 'completed' ? 'var(--success)' : trip.status === 'ongoing' ? 'var(--orange)' : 'var(--primary)',
                    }}
                  >
                    {trip.status || 'upcoming'}
                  </span>
                  <button
                    onClick={() => deleteTrip(trip.id)}
                    className="btn btn-outline btn-sm"
                    style={{ marginLeft: 'auto', padding: '4px 10px', fontSize: 11 }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">
              <Globe size={28} />
            </div>
            <h3>No Trips Found</h3>
            <p>
              {search || statusFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : "You haven't planned any trips yet. Start your first adventure!"}
            </p>
            {!search && statusFilter === 'all' && (
              <Link to="/create-trip" className="btn btn-primary btn-sm">
                <Plus size={16} />
                Plan Your First Trip
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
