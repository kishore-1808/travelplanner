import { useEffect, useCallback } from 'react'
import { create } from 'zustand'

const API_URL = import.meta.env.VITE_API_URL || 'https://travelplanner-t7ef.vercel.app';

const useGlobalStore = create((set, get) => ({
  // --- AUTH ---
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  authError: null,
  authLoading: false,
  
  signup: async (name, email, password) => {
    set({ authLoading: true, authError: null });
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      
      set({ authLoading: false });
      return true;
    } catch (err) {
      set({ authError: err.message, authLoading: false });
      return false;
    }
  },
  
  login: async (email, password) => {
    set({ authLoading: true, authError: null });
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      set({ user: data.user, token: data.token, authLoading: false });
      
      // Load data on login
      get().fetchTrips();
      get().fetchDocuments();
      get().fetchExpenses();
      
      return true;
    } catch (err) {
      set({ authError: err.message, authLoading: false });
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Clear the store variables when logging out
    set({ 
      user: null, 
      token: null,
      trips: [], tripsFetched: false,
      expenses: [], expensesFetched: false,
      documents: [], docsFetched: false
    });
  },

  // Helper function to get headers
  getAuthHeaders: () => {
    const token = get().token;
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  },

  // --- TRIPS ---
  trips: [],
  tripsFetched: false,
  tripsLoading: false,
  fetchTrips: async () => {
    if (get().tripsFetched || !get().token) return;
    set({ tripsLoading: true });
    try {
      const res = await fetch(`${API_URL}/api/trips`, {
        headers: { 'Authorization': `Bearer ${get().token}` }
      });
      const data = await res.json();
      if (res.ok) {
        set({ trips: data, tripsFetched: true });
      }
    } catch (err) {
      console.error('Failed to fetch trips:', err);
    } finally {
      set({ tripsLoading: false });
    }
  },
  addTrip: async (trip) => {
    try {
      const res = await fetch(`${API_URL}/api/trips`, {
        method: 'POST',
        headers: get().getAuthHeaders(),
        body: JSON.stringify(trip),
      });
      const newTrip = await res.json();
      if (res.ok) {
        set(state => ({ trips: [newTrip, ...state.trips] }));
        return newTrip;
      }
    } catch (err) {
      console.error('Failed to add trip:', err);
    }
  },
  updateTrip: async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/api/trips/${id}`, {
        method: 'PUT',
        headers: get().getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        set(state => ({ trips: state.trips.map(t => t.id === id ? { ...t, ...updates } : t) }));
      }
    } catch (err) {
      console.error('Failed to update trip:', err);
    }
  },
  deleteTrip: async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/trips/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${get().token}` }
      });
      if (res.ok) {
        set(state => ({ trips: state.trips.filter(t => t.id !== id) }));
      }
    } catch (err) {
      console.error('Failed to delete trip:', err);
    }
  },

  // --- DOCUMENTS ---
  documents: [],
  docsFetched: false,
  docsLoading: false,
  fetchDocuments: async () => {
    if (get().docsFetched || !get().token) return;
    set({ docsLoading: true });
    try {
      const res = await fetch(`${API_URL}/api/documents`, {
        headers: { 'Authorization': `Bearer ${get().token}` }
      });
      const data = await res.json();
      if (res.ok) {
        set({ documents: data, docsFetched: true });
      }
    } catch (err) {
      console.error('Failed to fetch documents:', err);
    } finally {
      set({ docsLoading: false });
    }
  },
  addDocument: async (doc) => {
    try {
      const res = await fetch(`${API_URL}/api/documents`, {
        method: 'POST',
        headers: get().getAuthHeaders(),
        body: JSON.stringify(doc),
      });
      if (res.ok) {
        const newDoc = await res.json();
        if (doc.fileData) newDoc.fileData = doc.fileData;
        set(state => ({ documents: [newDoc, ...state.documents] }));
        return newDoc;
      }
    } catch (err) {
      console.error('Failed to add document:', err);
    }
  },
  deleteDocument: async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/documents/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${get().token}` }
      });
      if (res.ok) {
        set(state => ({ documents: state.documents.filter(d => d.id !== id) }));
      }
    } catch (err) {
      console.error('Failed to delete document:', err);
    }
  },

  // --- EXPENSES ---
  expenses: [],
  expensesFetched: false,
  expensesLoading: false,
  fetchExpenses: async () => {
    if (get().expensesFetched || !get().token) return;
    set({ expensesLoading: true });
    try {
      const res = await fetch(`${API_URL}/api/expenses`, {
        headers: { 'Authorization': `Bearer ${get().token}` }
      });
      const data = await res.json();
      if (res.ok) {
        set({ expenses: data, expensesFetched: true });
      }
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    } finally {
      set({ expensesLoading: false });
    }
  },
  addExpense: async (expense) => {
    try {
      const res = await fetch(`${API_URL}/api/expenses`, {
        method: 'POST',
        headers: get().getAuthHeaders(),
        body: JSON.stringify(expense),
      });
      if (res.ok) {
        const newExp = await res.json();
        set(state => ({ expenses: [newExp, ...state.expenses] }));
        return newExp;
      }
    } catch (err) {
      console.error('Failed to add expense:', err);
    }
  },
  deleteExpense: async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/expenses/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${get().token}` }
      });
      if (res.ok) {
        set(state => ({ expenses: state.expenses.filter(e => e.id !== id) }));
      }
    } catch (err) {
      console.error('Failed to delete expense:', err);
    }
  }
}));

// --- EXPORTED HOOKS FOR COMPONENTS ---

// Exporting the auth hook
export function useAuth() {
  const store = useGlobalStore();
  
  return {
    user: store.user,
    token: store.token,
    authError: store.authError,
    authLoading: store.authLoading,
    login: store.login,
    signup: store.signup,
    logout: store.logout,
    isAuthenticated: !!store.token
  };
}

export function useTrips() {
  const store = useGlobalStore();
  
  useEffect(() => {
    store.fetchTrips();
  }, [store.fetchTrips, store.token]); // eslint-disable-line

  const getTrip = useCallback((id) => store.trips.find(t => t.id === id), [store.trips]);
  const getUpcomingTrips = useCallback(() => {
    return store.trips.filter(t => new Date(t.startDate) > new Date())
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }, [store.trips]);
  const getTotalBudget = useCallback(() => {
    const currentYear = new Date().getFullYear();
    return store.trips
      .filter(t => new Date(t.startDate).getFullYear() === currentYear)
      .reduce((sum, t) => sum + (parseFloat(t.budget) || 0), 0);
  }, [store.trips]);

  return {
    trips: store.trips,
    loading: !store.tripsFetched && store.tripsLoading,
    addTrip: store.addTrip,
    updateTrip: store.updateTrip,
    deleteTrip: store.deleteTrip,
    getTrip,
    getUpcomingTrips,
    getTotalBudget
  };
}

export function useDocuments() {
  const store = useGlobalStore();
  
  useEffect(() => {
    store.fetchDocuments();
  }, [store.fetchDocuments, store.token]); // eslint-disable-line

  return {
    documents: store.documents,
    loading: !store.docsFetched && store.docsLoading,
    addDocument: store.addDocument,
    deleteDocument: store.deleteDocument
  };
}

export function useExpenses() {
  const store = useGlobalStore();
  
  useEffect(() => {
    store.fetchExpenses();
  }, [store.fetchExpenses, store.token]); // eslint-disable-line

  const getExpensesByTrip = useCallback((tripId) => store.expenses.filter(e => e.tripId === tripId), [store.expenses]);
  const getTotalSpent = useCallback((tripId) => {
    const filtered = tripId ? store.expenses.filter(e => e.tripId === tripId) : store.expenses;
    return filtered.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  }, [store.expenses]);
  
  const getByCategory = useCallback((tripId) => {
    const filtered = tripId ? store.expenses.filter(e => e.tripId === tripId) : store.expenses;
    const categories = {};
    filtered.forEach(e => {
      const cat = e.category || 'other';
      categories[cat] = (categories[cat] || 0) + (parseFloat(e.amount) || 0);
    });
    return categories;
  }, [store.expenses]);

  return {
    expenses: store.expenses,
    loading: !store.expensesFetched && store.expensesLoading,
    addExpense: store.addExpense,
    deleteExpense: store.deleteExpense,
    getExpensesByTrip,
    getTotalSpent,
    getByCategory
  };
}
