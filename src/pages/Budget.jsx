import { useState, useMemo } from 'react'
import {
  IndianRupee, TrendingDown, PiggyBank, Plus,
  ShoppingBag, Utensils, Car, Hotel, Ticket, MoreHorizontal,
  BarChart3
} from 'lucide-react'
import { useTrips, useExpenses } from '../hooks/useStore'

const EXPENSE_CATEGORIES = [
  { value: 'food', label: 'Food & Dining', icon: Utensils, color: '#F97316' },
  { value: 'transport', label: 'Transportation', icon: Car, color: '#2563EB' },
  { value: 'accommodation', label: 'Accommodation', icon: Hotel, color: '#8B5CF6' },
  { value: 'activities', label: 'Activities', icon: Ticket, color: '#22C55E' },
  { value: 'shopping', label: 'Shopping', icon: ShoppingBag, color: '#EC4899' },
  { value: 'other', label: 'Other', icon: MoreHorizontal, color: '#64748B' },
]

export default function Budget() {
  const { trips } = useTrips()
  const { expenses, addExpense, deleteExpense, getTotalSpent, getByCategory } = useExpenses()
  const [selectedTrip, setSelectedTrip] = useState('all')
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [form, setForm] = useState({ description: '', amount: '', category: 'food', tripId: '' })

  const totalBudget = useMemo(() => {
    if (selectedTrip === 'all') {
      return trips.reduce((sum, t) => sum + (parseFloat(t.budget) || 0), 0)
    }
    const trip = trips.find(t => t.id === selectedTrip)
    return trip ? parseFloat(trip.budget) || 0 : 0
  }, [trips, selectedTrip])

  const totalSpent = getTotalSpent(selectedTrip === 'all' ? null : selectedTrip)
  const remaining = totalBudget - totalSpent
  const categoryBreakdown = getByCategory(selectedTrip === 'all' ? null : selectedTrip)

  const filteredExpenses = useMemo(() => {
    if (selectedTrip === 'all') return expenses
    return expenses.filter(e => e.tripId === selectedTrip)
  }, [expenses, selectedTrip])

  const handleAddExpense = (e) => {
    e.preventDefault()
    if (!form.description || !form.amount) return
    addExpense({
      ...form,
      tripId: form.tripId || (selectedTrip !== 'all' ? selectedTrip : trips[0]?.id || ''),
    })
    setForm({ description: '', amount: '', category: 'food', tripId: '' })
    setShowAddExpense(false)
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="page-title">Budget Tracker</h1>
            <p className="page-subtitle">Monitor your travel spending and stay on budget.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <select
              className="form-select"
              value={selectedTrip}
              onChange={e => setSelectedTrip(e.target.value)}
              style={{ width: 180 }}
              id="trip-budget-filter"
            >
              <option value="all">All Trips</option>
              {trips.map(t => (
                <option key={t.id} value={t.id}>{t.name || t.destination}</option>
              ))}
            </select>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddExpense(!showAddExpense)}>
              <Plus size={16} />
              Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* Add Expense Form */}
      {showAddExpense && (
        <div className="inline-form-card" style={{ marginBottom: 24 }}>
          <h3 className="card-title" style={{ marginBottom: 16 }}>Add New Expense</h3>
          <form onSubmit={handleAddExpense}>
            <div className="grid-2" style={{ marginBottom: 0 }}>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  className="form-input"
                  placeholder="What did you spend on?"
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  id="expense-description"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Amount (INR)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))}
                  id="expense-amount"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={form.category}
                  onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                  id="expense-category"
                >
                  {EXPENSE_CATEGORIES.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              {selectedTrip === 'all' && trips.length > 0 && (
                <div className="form-group">
                  <label className="form-label">Trip</label>
                  <select
                    className="form-select"
                    value={form.tripId}
                    onChange={e => setForm(prev => ({ ...prev, tripId: e.target.value }))}
                    id="expense-trip"
                  >
                    <option value="">Select trip</option>
                    {trips.map(t => (
                      <option key={t.id} value={t.id}>{t.name || t.destination}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowAddExpense(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">Save Expense</button>
            </div>
          </form>
        </div>
      )}

      {/* Budget Stats */}
      <div className="budget-stats">
        <div className="budget-stat-card blue">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="stat-icon blue">
              <IndianRupee size={22} />
            </div>
          </div>
          <div className="stat-value">₹{totalBudget.toLocaleString()}</div>
          <div className="stat-label">Total Budget</div>
        </div>
        <div className="budget-stat-card orange">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="stat-icon orange">
              <TrendingDown size={22} />
            </div>
          </div>
          <div className="stat-value">₹{totalSpent.toLocaleString()}</div>
          <div className="stat-label">Total Spent</div>
        </div>
        <div className="budget-stat-card green">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="stat-icon green">
              <PiggyBank size={22} />
            </div>
          </div>
          <div className="stat-value">₹{remaining.toLocaleString()}</div>
          <div className="stat-label">Budget Remaining</div>
        </div>
      </div>

      {/* Charts & Transactions */}
      <div className="grid-2">
        {/* Spending by Category */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Spending by Category</h3>
          </div>
          {Object.keys(categoryBreakdown).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {EXPENSE_CATEGORIES.filter(c => categoryBreakdown[c.value]).map(cat => {
                const amount = categoryBreakdown[cat.value]
                const percentage = totalSpent > 0 ? (amount / totalSpent * 100).toFixed(0) : 0
                return (
                  <div key={cat.value}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                        <cat.icon size={14} style={{ color: cat.color }} />
                        {cat.label}
                      </span>
                      <span style={{ fontWeight: 600 }}>₹{amount.toLocaleString()}</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--bg-main)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${percentage}%`, background: cat.color, borderRadius: 'var(--radius-full)', transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <BarChart3 size={28} />
              </div>
              <h3>No spending data</h3>
              <p>Add expenses to see category breakdown</p>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Transactions</h3>
          </div>
          {filteredExpenses.length > 0 ? (
            <div>
              {filteredExpenses.slice(0, 8).map(exp => {
                const cat = EXPENSE_CATEGORIES.find(c => c.value === exp.category) || EXPENSE_CATEGORIES[5]
                return (
                  <div key={exp.id} className="transaction-item">
                    <div className="transaction-info">
                      <div className="transaction-category-icon" style={{ background: `${cat.color}15`, color: cat.color }}>
                        <cat.icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{exp.description}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                          {new Date(exp.createdAt).toLocaleDateString()} · {cat.label}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="transaction-amount expense">
                        -₹{parseFloat(exp.amount).toLocaleString()}
                      </span>
                      <button
                        onClick={() => deleteExpense(exp.id)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '2px 8px', fontSize: 11 }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <IndianRupee size={28} />
              </div>
              <h3>No transactions</h3>
              <p>Add expenses to track your spending</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
