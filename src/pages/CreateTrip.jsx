import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, IndianRupee, Compass, Star, Calendar, ChevronDown, Navigation, Hotel, X, CheckCircle } from 'lucide-react'
import { useTrips } from '../hooks/useStore'
import { DESTINATION_CATEGORIES, DESTINATIONS } from '../data/destinationData'

export default function CreateTrip() {
  const navigate = useNavigate()
  const { addTrip } = useTrips()

  const [showConfirm, setShowConfirm] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('')

  const [form, setForm] = useState({
    destination: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
  })

  // Filter destinations by selected category
  const filteredDestinations = useMemo(() => {
    if (!selectedCategory) return DESTINATIONS
    return DESTINATIONS.filter(d => d.category === selectedCategory)
  }, [selectedCategory])

  // Budget-based recommendations
  const recommendations = useMemo(() => {
    const budget = parseFloat(form.budget)
    if (!budget || budget <= 0) return []

    let filtered = DESTINATIONS.filter(
      d => budget >= d.budgetRange.min && budget <= d.budgetRange.max * 1.5
    )

    // If category is selected, show ONLY that category
    if (selectedCategory) {
      filtered = filtered.filter(d => d.category === selectedCategory)
    }

    // Sort by closest match (budget closest to midpoint of range)
    filtered.sort((a, b) => {
      const midA = (a.budgetRange.min + a.budgetRange.max) / 2
      const midB = (b.budgetRange.min + b.budgetRange.max) / 2
      return Math.abs(budget - midA) - Math.abs(budget - midB)
    })

    return filtered.slice(0, 6)
  }, [form.budget, selectedCategory])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setForm(prev => ({ ...prev, destination: '' }))
  }

  const handleDestinationChange = (e) => {
    const dest = DESTINATIONS.find(d => d.name === e.target.value)
    setForm(prev => ({ ...prev, destination: e.target.value }))
    if (dest) {
      if (!selectedCategory) setSelectedCategory(dest.category)
      setShowConfirm(dest)
    }
  }

  const handleRecommendationClick = (dest) => {
    setSelectedCategory(dest.category)
    setForm(prev => ({
      ...prev,
      destination: dest.name,
      name: prev.name || `Trip to ${dest.name}`,
      description: prev.description || dest.description,
    }))
    setShowConfirm(dest)
  }

  const handleGetRoute = (e, dest) => {
    e.stopPropagation()
    const destination = encodeURIComponent(`${dest.name}, ${dest.state}, India`)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=transit`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleFindHotels = (e, dest) => {
    e.stopPropagation()
    const budget = parseFloat(form.budget) || 10000
    const maxPerNight = Math.round(budget / 5)
    const { lat: destLat, lng: destLng } = dest.coordinates

    const openHotelSearch = (userLat, userLng) => {
      // Midpoint between user location and destination — centres map along the route
      const midLat = ((userLat + destLat) / 2).toFixed(4)
      const midLng = ((userLng + destLng) / 2).toFixed(4)

      // Zoom level based on distance so the full route is visible
      const dist = Math.sqrt(Math.pow(destLat - userLat, 2) + Math.pow(destLng - userLng, 2))
      let zoom = 8
      if (dist > 15) zoom = 5
      else if (dist > 8) zoom = 6
      else if (dist > 4) zoom = 7

      const query = encodeURIComponent(`hotels under ₹${maxPerNight} per night`)
      const url = `https://www.google.com/maps/search/${query}/@${midLat},${midLng},${zoom}z`
      window.open(url, '_blank', 'noopener,noreferrer')
    }

    // Fallback: search near destination with price cap
    const fallback = () => {
      const query = encodeURIComponent(`hotels under ₹${maxPerNight} per night near ${dest.name}, ${dest.state}, India`)
      const url = `https://www.google.com/maps/search/${query}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => openHotelSearch(pos.coords.latitude, pos.coords.longitude),
        () => fallback(),
        { timeout: 5000 }
      )
    } else {
      fallback()
    }
  }

  const getCategoryLabel = (catId) => {
    const cat = DESTINATION_CATEGORIES.find(c => c.id === catId)
    return cat ? cat.label : catId
  }

  const getCategoryColor = (catId) => {
    const cat = DESTINATION_CATEGORIES.find(c => c.id === catId)
    return cat ? cat.color : '#64748B'
  }

  const formatBudget = (num) => {
    if (num >= 1000) return `₹${(num / 1000).toFixed(0)}K`
    return `₹${num}`
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.destination) return
    addTrip({ ...form })
    navigate('/trips')
  }

  return (
    <div>
      {/* Back Button & Header */}
      <button className="back-button" onClick={() => navigate(-1)} id="back-btn">
        <ArrowLeft size={20} />
      </button>
      <div className="page-header">
        <h1 className="page-title">Plan New Adventure</h1>
        <p className="page-subtitle">Create your next amazing journey with smart recommendations.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="create-trip-layout">
          {/* Main Form */}
          <div>
            {/* Trip Details Card */}
            <div className="card" style={{ marginBottom: 24 }}>
              <h3 className="card-title" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Compass size={20} style={{ color: 'var(--primary)' }} />
                Trip Details
              </h3>

              {/* Category Dropdown */}
              <div className="form-group">
                <label className="form-label" htmlFor="category">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    Destination Category
                  </span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="category"
                    name="category"
                    className="form-select category-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">All Categories</option>
                    {DESTINATION_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="select-chevron" />
                </div>
              </div>

              {/* Destination Dropdown */}
              <div className="form-group">
                <label className="form-label" htmlFor="destination">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={16} style={{ color: 'var(--primary)' }} />
                    Destination
                  </span>
                </label>
                <div className="select-wrapper">
                  <select
                    id="destination"
                    name="destination"
                    className="form-select"
                    value={form.destination}
                    onChange={handleDestinationChange}
                    required
                  >
                    <option value="">Select a destination</option>
                    {filteredDestinations.map(d => (
                      <option key={d.name} value={d.name}>
                        {d.name} — {d.state}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="select-chevron" />
                </div>
                {form.destination && (() => {
                  const dest = DESTINATIONS.find(d => d.name === form.destination)
                  return dest ? (
                    <div className="destination-info-pill">
                      <span className="rec-category-badge" style={{ background: `${getCategoryColor(dest.category)}18`, color: getCategoryColor(dest.category) }}>
                        {getCategoryLabel(dest.category)}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                        {dest.state} • {formatBudget(dest.budgetRange.min)} – {formatBudget(dest.budgetRange.max)}
                      </span>
                    </div>
                  ) : null
                })()}
              </div>

              {/* Trip Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="name">Trip Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Give your trip a name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  placeholder="Describe your trip..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Dates & Budget Card */}
            <div className="card" style={{ marginBottom: 24 }}>
              <h3 className="card-title" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Calendar size={20} style={{ color: 'var(--primary)' }} />
                Dates & Budget
              </h3>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="startDate">Start Date</label>
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="form-input"
                    value={form.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="endDate">End Date</label>
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    className="form-input"
                    value={form.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="budget">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <IndianRupee size={16} style={{ color: 'var(--success)' }} />
                    Total Budget (INR)
                  </span>
                </label>
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  className="form-input"
                  placeholder="Enter your budget to get recommendations"
                  value={form.budget}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Budget Recommendations */}
            {recommendations.length > 0 && (
              <div className="recommendation-section">
                <div className="recommendation-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="recommendation-icon-wrap">
                      <Star size={20} />
                    </div>
                    <div>
                      <h3>Recommended for You</h3>
                      <p>Based on your budget of ₹{parseFloat(form.budget).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
                <div className="recommendation-grid">
                  {recommendations.map((dest, idx) => (
                    <div
                      key={dest.name}
                      className={`recommendation-card ${form.destination === dest.name ? 'active' : ''}`}
                      onClick={() => handleRecommendationClick(dest)}
                      style={{ animationDelay: `${idx * 0.06}s` }}
                    >
                      <div className="rec-card-top">
                        <div className="rec-card-name">
                          <MapPin size={14} />
                          <h4>{dest.name}</h4>
                        </div>
                        <span
                          className="rec-category-badge"
                          style={{ background: `${getCategoryColor(dest.category)}18`, color: getCategoryColor(dest.category) }}
                        >
                          {getCategoryLabel(dest.category)}
                        </span>
                      </div>
                      <p className="rec-card-desc">{dest.description}</p>
                      <div className="rec-card-bottom">
                        <div className="rec-card-meta">
                          <span className="rec-meta-item">
                            <IndianRupee size={12} />
                            {formatBudget(dest.budgetRange.min)} – {formatBudget(dest.budgetRange.max)}
                          </span>
                          <span className="rec-meta-item">
                            <Calendar size={12} />
                            {dest.bestSeason}
                          </span>
                        </div>
                        <div className="rec-card-actions">
                          <button
                            type="button"
                            className="route-btn"
                            onClick={(e) => handleGetRoute(e, dest)}
                            title={`Get route to ${dest.name}`}
                          >
                            <Navigation size={13} />
                            Route
                          </button>
                          <button
                            type="button"
                            className="hotel-btn"
                            onClick={(e) => handleFindHotels(e, dest)}
                            title={`Find hotels near ${dest.name}`}
                          >
                            <Hotel size={13} />
                            Hotels
                          </button>
                        </div>
                      </div>
                      <div className="rec-card-state">{dest.state}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-gradient btn-lg">
                Create Trip
              </button>
            </div>
          </div>

          {/* Destination Info Sidebar */}
          <div>
            {form.destination && (() => {
              const dest = DESTINATIONS.find(d => d.name === form.destination)
              return dest ? (
                <div className="card destination-sidebar-card" style={{ marginTop: 0 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={16} style={{ color: 'var(--primary)' }} />
                    {dest.name}
                  </h4>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
                    {dest.description}
                  </p>
                  <div className="dest-sidebar-meta">
                    <div className="dest-meta-row">
                      <span className="dest-meta-label">State</span>
                      <span className="dest-meta-value">{dest.state}</span>
                    </div>
                    <div className="dest-meta-row">
                      <span className="dest-meta-label">Budget Range</span>
                      <span className="dest-meta-value">{formatBudget(dest.budgetRange.min)} – {formatBudget(dest.budgetRange.max)}</span>
                    </div>
                    <div className="dest-meta-row">
                      <span className="dest-meta-label">Best Season</span>
                      <span className="dest-meta-value">{dest.bestSeason}</span>
                    </div>
                    <div className="dest-meta-row">
                      <span className="dest-meta-label">Category</span>
                      <span className="rec-category-badge" style={{ background: `${getCategoryColor(dest.category)}18`, color: getCategoryColor(dest.category), fontSize: 11 }}>
                        {getCategoryLabel(dest.category)}
                      </span>
                    </div>
                  </div>
                  <div className="sidebar-action-btns">
                    <button
                      type="button"
                      className="route-btn route-btn-sidebar"
                      onClick={(e) => handleGetRoute(e, dest)}
                      title={`Get route to ${dest.name}`}
                    >
                      <Navigation size={15} />
                      Get Route
                    </button>
                    <button
                      type="button"
                      className="hotel-btn hotel-btn-sidebar"
                      onClick={(e) => handleFindHotels(e, dest)}
                      title={`Find hotels near ${dest.name}`}
                    >
                      <Hotel size={15} />
                      Find Hotels
                    </button>
                  </div>
                </div>
              ) : null
            })()}
          </div>
        </div>
      </form>

      {/* Destination Confirmation Popup */}
      {showConfirm && (
        <div className="confirm-overlay" onClick={() => setShowConfirm(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <button className="confirm-close" onClick={() => setShowConfirm(null)}>
              <X size={18} />
            </button>
            <div className="confirm-icon-wrap">
              <CheckCircle size={36} />
            </div>
            <h3 className="confirm-title">Destination Selected!</h3>
            <div className="confirm-dest-name">
              <MapPin size={18} />
              {showConfirm.name}, {showConfirm.state}
            </div>
            <p className="confirm-desc">{showConfirm.description}</p>
            <div className="confirm-meta">
              <div className="confirm-meta-item">
                <IndianRupee size={14} />
                {formatBudget(showConfirm.budgetRange.min)} – {formatBudget(showConfirm.budgetRange.max)}
              </div>
              <div className="confirm-meta-item">
                <Calendar size={14} />
                {showConfirm.bestSeason}
              </div>
              <div className="confirm-meta-item">
                <span className="rec-category-badge" style={{ background: `${getCategoryColor(showConfirm.category)}18`, color: getCategoryColor(showConfirm.category) }}>
                  {getCategoryLabel(showConfirm.category)}
                </span>
              </div>
            </div>
            <div className="confirm-actions">
              <button
                type="button"
                className="route-btn confirm-action-btn"
                onClick={(e) => { handleGetRoute(e, showConfirm) }}
              >
                <Navigation size={18} />
                Get Route
              </button>
              <button
                type="button"
                className="hotel-btn confirm-action-btn"
                onClick={(e) => { handleFindHotels(e, showConfirm) }}
              >
                <Hotel size={18} />
                Find Hotels
              </button>
            </div>
            <button
              type="button"
              className="btn btn-gradient confirm-continue-btn"
              onClick={() => setShowConfirm(null)}
            >
              Continue Planning
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
