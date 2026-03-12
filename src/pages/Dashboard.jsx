import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plane, MapPin, IndianRupee, Compass, Home,
  Globe, Cloud, CloudRain, CloudSnow, CloudLightning,
  Sun, Moon, TrendingUp, Map, Calendar,
  BarChart3, CreditCard
} from 'lucide-react'
import { useTrips, useExpenses } from '../hooks/useStore'

export default function Dashboard() {
  const { trips, getUpcomingTrips, getTotalBudget } = useTrips()
  const { getTotalSpent } = useExpenses()
  const upcomingTrips = getUpcomingTrips()
  const totalBudget = getTotalBudget()
  const totalSpent = getTotalSpent()

  const nextTrip = upcomingTrips.length > 0
    ? upcomingTrips[0]
    : null

  const nextTripLabel = nextTrip
    ? `${nextTrip.destination} - ${new Date(nextTrip.startDate).toLocaleDateString()}`
    : 'Plan one!'

  const [weather, setWeather] = useState({ loading: false, data: null, error: null })

  useEffect(() => {
    if (!nextTrip || !nextTrip.destination) {
      setWeather({ loading: false, data: null, error: null })
      return
    }

    const fetchWeather = async () => {
      setWeather(prev => ({ ...prev, loading: true, error: null }))
      try {
        // 1. Get coordinates for destination
        const geoResp = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nextTrip.destination)}&count=1&language=en&format=json`)
        const geoData = await geoResp.json()
        
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error('Could not find location')
        }
        
        const { latitude, longitude, name, country } = geoData.results[0]
        
        // 2. Get weather for coordinates
        const weatherResp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        const weatherData = await weatherResp.json()
        
        if (weatherData.current_weather) {
          setWeather({
            loading: false,
            error: null,
            data: {
              ...weatherData.current_weather,
              locationName: `${name}${country ? `, ${country}` : ''}`
            }
          })
        } else {
          throw new Error('Weather data unavailable')
        }
      } catch (err) {
        console.error('Weather fetch error:', err)
        setWeather({ loading: false, data: null, error: err.message })
      }
    }

    fetchWeather()
  }, [nextTrip?.destination])

  const getWeatherIcon = (code) => {
    if (code <= 3) return <Sun size={40} className="weather-icon-sun" color="#FACC15" />
    if (code <= 48) return <Cloud size={40} color="#94A3B8" />
    if (code <= 67 || (code >= 80 && code <= 82)) return <CloudRain size={40} color="#3B82F6" />
    if (code <= 77 || code === 85 || code === 86) return <CloudSnow size={40} color="#E2E8F0" />
    if (code >= 95) return <CloudLightning size={40} color="#8B5CF6" />
    return <Cloud size={40} color="#94A3B8" />
  }

  const getWeatherDescription = (code) => {
    if (code === 0) return 'Clear sky'
    if (code === 1 || code === 2 || code === 3) return 'Partly cloudy'
    if (code === 45 || code === 48) return 'Foggy'
    if (code >= 51 && code <= 67) return 'Rain / Drizzle'
    if (code >= 71 && code <= 77) return 'Snow'
    if (code >= 80 && code <= 82) return 'Rain showers'
    if (code >= 95) return 'Thunderstorm'
    return 'Cloudy'
  }

  return (
    <div>
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h2>Welcome back, Traveler! ✈️</h2>
        <p>
          Ready to plan your next adventure? Explore new destinations, 
          track your budget, and create unforgettable memories.
        </p>
        <div className="welcome-banner-actions">
          <Link to="/create-trip" className="btn btn-white btn-lg">
            <Plane size={18} />
            Plan New Trip
          </Link>
          <Link to="/trips" className="btn btn-accent btn-lg">
            <Map size={18} />
            View All Trips
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-icon blue">
            <MapPin size={22} />
          </div>
          <div className="stat-info">
            <h3>{trips.length}</h3>
            <p>Total Trips</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <IndianRupee size={22} />
          </div>
          <div className="stat-info">
            <h3>₹{totalBudget.toLocaleString()}</h3>
            <p>This Year Budget</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Compass size={22} />
          </div>
          <div className="stat-info">
            <h3>{nextTripLabel}</h3>
            <p>Next Adventure</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <Home size={22} />
          </div>
          <div className="stat-info">
            <h3>{upcomingTrips.length > 0 ? 'Traveling soon' : 'At home'}</h3>
            <p>Travel Status</p>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        <div>
          {/* Upcoming Adventures */}
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="card-header">
              <h3 className="card-title">Upcoming Adventures</h3>
              <Link to="/trips" className="card-link">View All</Link>
            </div>
            {upcomingTrips.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {upcomingTrips.slice(0, 3).map(trip => (
                  <div key={trip.id} className="document-item" style={{ border: 'none', padding: '12px 0', marginBottom: 0 }}>
                    <div className="stat-icon blue" style={trip.imageUrl ? { background: `url(${trip.imageUrl}) center/cover no-repeat`, color: 'transparent' } : {}}>
                      {!trip.imageUrl && <MapPin size={20} />}
                    </div>
                    <div className="document-info">
                      <h4>{trip.name || trip.destination}</h4>
                      <p>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
                      ₹{parseFloat(trip.budget || 0).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Globe size={28} />
                </div>
                <h3>No upcoming trips</h3>
                <p>Start planning your next adventure!</p>
                <Link to="/create-trip" className="btn btn-primary btn-sm">
                  <Plane size={16} />
                  Plan Your First Trip
                </Link>
              </div>
            )}
          </div>

          {/* Weather */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Live Weather</h3>
            </div>
            <div className="weather-card-content" style={{ padding: '16px 24px' }}>
              {!nextTrip ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Cloud size={40} style={{ marginBottom: 8, opacity: 0.5 }} />
                  <p>No upcoming trips to show weather for</p>
                </div>
              ) : weather.loading ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ width: 40, height: 40, border: '3px solid #E2E8F0', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
                  <p>Fetching weather for {nextTrip.destination}...</p>
                </div>
              ) : weather.error ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Cloud size={40} style={{ marginBottom: 8, opacity: 0.5 }} />
                  <p>Could not load weather for {nextTrip.destination}</p>
                </div>
              ) : weather.data ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    {getWeatherIcon(weather.data.weathercode)}
                    <div>
                      <h4 style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                        {weather.data.temperature}°C
                      </h4>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500, marginTop: 4 }}>
                        {getWeatherDescription(weather.data.weathercode)}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 }}>
                      Destination
                    </p>
                    <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {weather.data.locationName}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                      Wind: {weather.data.windspeed} km/h
                    </p>
                  </div>
                  <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Travel Insights */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Travel Insights</h3>
          </div>
          <div className="insights-list">
            <div className="insight-item">
              <div className="insight-icon" style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}>
                <Globe size={18} />
              </div>
              <div className="insight-info">
                <h4>Most Visited</h4>
                <p>{trips.length > 0 ? trips[0].destination : '—'}</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
                <CreditCard size={18} />
              </div>
              <div className="insight-info">
                <h4>Per Transaction</h4>
                <p>₹{totalSpent > 0 ? Math.round(totalSpent / trips.length) : 0}</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>
                <BarChart3 size={18} />
              </div>
              <div className="insight-info">
                <h4>Total Expenses</h4>
                <p>₹{totalSpent.toLocaleString()}</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon" style={{ background: 'var(--orange-bg)', color: 'var(--orange)' }}>
                <Calendar size={18} />
              </div>
              <div className="insight-info">
                <h4>Trips This Year</h4>
                <p>{trips.filter(t => new Date(t.startDate).getFullYear() === new Date().getFullYear()).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
