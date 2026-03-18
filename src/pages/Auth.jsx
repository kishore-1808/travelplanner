import { useState, useEffect } from 'react';
import './Auth.css';
import { useAuth } from '../hooks/useStore';
import { useNavigate } from 'react-router-dom';
import { Plane, LogIn, UserPlus } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const { login, signup, authError, authLoading, isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Plane size={32} color="var(--primary-color)" />
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to plan your next adventure' : 'Join us to start planning your trips'}</p>
        </div>
        
        {authError && <div className="auth-error">{authError}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="John Doe"
              />
            </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="hello@example.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
              minLength={6}
            />
          </div>
          
          <button type="submit" className="primary-btn auth-submit-btn" disabled={authLoading}>
            {authLoading ? 'Please wait...' : (isLogin ? <><LogIn size={18} /> Login</> : <><UserPlus size={18} /> Sign Up</>)}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" className="text-btn toggle-auth-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
