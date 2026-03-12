import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ImagePlus, Sparkles } from 'lucide-react'
import { useTrips } from '../hooks/useStore'

export default function CreateTrip() {
  const navigate = useNavigate()
  const { addTrip } = useTrips()

  const [isGenerating, setIsGenerating] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const [form, setForm] = useState({
    destination: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleGenerateImage = async () => {
    if (!form.destination) {
      alert('Please enter a destination to generate an image')
      return
    }
    setIsGenerating(true)
    try {
      const resp = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(form.destination)}`)
      const data = await resp.json()
      if (data.originalimage && data.originalimage.source) {
        setImageUrl(data.originalimage.source)
      } else {
        alert('Could not find a representative image for this destination. Try adding a country name.')
      }
    } catch (err) {
      console.error('Error generating image', err)
      alert('Error fetching image. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.destination) return
    addTrip({ ...form, imageUrl })
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
        <p className="page-subtitle">Create your next amazing journey.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="create-trip-layout">
          {/* Main Form */}
          <div>
            {/* Trip Details Card */}
            <div className="card" style={{ marginBottom: 24 }}>
              <h3 className="card-title" style={{ marginBottom: 20 }}>Trip Details</h3>
              <div className="form-group">
                <label className="form-label" htmlFor="destination">Destination</label>
                <input
                  id="destination"
                  name="destination"
                  type="text"
                  className="form-input"
                  placeholder="Where are you going?"
                  value={form.destination}
                  onChange={handleChange}
                  required
                />
              </div>
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
              <h3 className="card-title" style={{ marginBottom: 20 }}>Dates & Budget</h3>
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
                <label className="form-label" htmlFor="budget">Total Budget (INR)</label>
                <input
                  id="budget"
                  name="budget"
                  type="number"
                  className="form-input"
                  placeholder="0.00"
                  value={form.budget}
                  onChange={handleChange}
                />
              </div>
            </div>

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

          {/* Trip Image Sidebar */}
          <div>
            <div className="image-upload-card">
              <div className="image-placeholder" style={imageUrl ? { background: `url(${imageUrl}) center/cover no-repeat`, color: 'transparent' } : {}}>
                {!imageUrl && <ImagePlus size={48} />}
              </div>
              <div className="image-upload-actions">
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
                  {imageUrl ? 'Destination image loaded!' : 'Add a cover image for your trip'}
                </p>
                <button 
                  type="button" 
                  className="btn btn-accent btn-sm" 
                  style={{ width: '100%' }}
                  onClick={handleGenerateImage}
                  disabled={isGenerating}
                >
                  <Sparkles size={16} />
                  {isGenerating ? 'Generating...' : (imageUrl ? 'Regenerate Image' : 'Generate Image')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
