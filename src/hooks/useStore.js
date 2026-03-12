import { useState, useEffect, useCallback } from 'react'

const API_URL = import.meta.env.VITE_API_URL || '';// --- TRIPS STORE ---
export function useTrips() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTrips = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/trips`)
      const data = await res.json()
      setTrips(data)
    } catch (err) {
      console.error('Failed to fetch trips:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTrips()
  }, [fetchTrips])

  const addTrip = useCallback(async (trip) => {
    try {
      const res = await fetch(`${API_URL}/api/trips`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trip),
      })
      const newTrip = await res.json()
      setTrips(prev => [newTrip, ...prev])
      return newTrip
    } catch (err) {
      console.error('Failed to add trip:', err)
    }
  }, [])

  const updateTrip = useCallback(async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/api/trips/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (res.ok) {
        setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
      }
    } catch (err) {
      console.error('Failed to update trip:', err)
    }
  }, [])

  const deleteTrip = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/trips/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setTrips(prev => prev.filter(t => t.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete trip:', err)
    }
  }, [])

  const getTrip = useCallback((id) => {
    return trips.find(t => t.id === id)
  }, [trips])

  const getUpcomingTrips = useCallback(() => {
    return trips.filter(t => new Date(t.startDate) > new Date())
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
  }, [trips])

  const getTotalBudget = useCallback(() => {
    const currentYear = new Date().getFullYear()
    return trips
      .filter(t => new Date(t.startDate).getFullYear() === currentYear)
      .reduce((sum, t) => sum + (parseFloat(t.budget) || 0), 0)
  }, [trips])

  return { trips, loading, addTrip, updateTrip, deleteTrip, getTrip, getUpcomingTrips, getTotalBudget }
}

// --- DOCUMENTS STORE ---
export function useDocuments() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/documents`)
      const data = await res.json()
      setDocuments(data)
    } catch (err) {
      console.error('Failed to fetch documents:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const addDocument = useCallback(async (doc) => {
    try {
      const res = await fetch(`${API_URL}/api/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc),
      })
      const newDoc = await res.json()
      
      // If we saved fileData, manually add it to local state to avoid refetching 50mb payloads
      if (doc.fileData) {
        newDoc.fileData = doc.fileData
      }
      
      setDocuments(prev => [newDoc, ...prev])
      return newDoc
    } catch (err) {
      console.error('Failed to add document:', err)
    }
  }, [])

  const deleteDocument = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/documents/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setDocuments(prev => prev.filter(d => d.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete document:', err)
    }
  }, [])

  return { documents, loading, addDocument, deleteDocument }
}

// --- EXPENSES STORE ---
export function useExpenses() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchExpenses = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/expenses`)
      const data = await res.json()
      setExpenses(data)
    } catch (err) {
      console.error('Failed to fetch expenses:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchExpenses()
  }, [fetchExpenses])

  const addExpense = useCallback(async (expense) => {
    try {
      const res = await fetch(`${API_URL}/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      })
      const newExpense = await res.json()
      setExpenses(prev => [newExpense, ...prev])
      return newExpense
    } catch (err) {
      console.error('Failed to add expense:', err)
    }
  }, [])

  const deleteExpense = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/expenses/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setExpenses(prev => prev.filter(e => e.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete expense:', err)
    }
  }, [])

  const getExpensesByTrip = useCallback((tripId) => {
    return expenses.filter(e => e.tripId === tripId)
  }, [expenses])

  const getTotalSpent = useCallback((tripId) => {
    const filtered = tripId ? expenses.filter(e => e.tripId === tripId) : expenses
    return filtered.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0)
  }, [expenses])

  const getByCategory = useCallback((tripId) => {
    const filtered = tripId ? expenses.filter(e => e.tripId === tripId) : expenses
    const categories = {}
    filtered.forEach(e => {
      const cat = e.category || 'Other'
      categories[cat] = (categories[cat] || 0) + (parseFloat(e.amount) || 0)
    })
    return categories
  }, [expenses])

  return { expenses, loading, addExpense, deleteExpense, getExpensesByTrip, getTotalSpent, getByCategory }
}
