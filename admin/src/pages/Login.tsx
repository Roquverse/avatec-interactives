import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_user', JSON.stringify(response.data.admin));
      if (response.data.admin?.name) {
        localStorage.setItem('admin_name', response.data.admin.name);
      }
      if (response.data.admin?.email) {
        localStorage.setItem('admin_email', response.data.admin.email);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#070709',
      color: '#f5f5f7',
      position: 'relative',
      padding: '1.5rem',
      backgroundImage: `
        radial-gradient(circle at 50% 25%, rgba(56, 189, 248, 0.08) 0%, transparent 60%),
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 36px 36px, 36px 36px'
    }}>
      {/* Top subtle border beam */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.3), transparent)'
      }} />

      {/* Main Login Card */}
      <div className="animate-fade-in" style={{ 
        width: '100%', 
        maxWidth: '400px', 
        position: 'relative',
        zIndex: 1
      }}>
        {/* Card Container */}
        <div style={{
          backgroundColor: '#0c0d12',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '8px',
          padding: '2.5rem 2.25rem',
          position: 'relative',
          boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.02)'
        }}>
          {/* Subtle Corner Crosshairs */}
          <span style={{ position: 'absolute', top: '-7px', left: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b', opacity: 0.4, pointerEvents: 'none' }}>+</span>
          <span style={{ position: 'absolute', top: '-7px', right: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b', opacity: 0.4, pointerEvents: 'none' }}>+</span>
          <span style={{ position: 'absolute', bottom: '-8px', left: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b', opacity: 0.4, pointerEvents: 'none' }}>+</span>
          <span style={{ position: 'absolute', bottom: '-8px', right: '-5px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#5e606b', opacity: 0.4, pointerEvents: 'none' }}>+</span>

          {/* Header */}
          <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
            {/* Monogram Brand Icon */}
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              backgroundColor: '#070709',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 800,
              fontSize: '12px',
              color: '#f5f5f7',
              marginBottom: '1.25rem',
              position: 'relative'
            }}>
              <span>AV</span>
              <span style={{
                position: 'absolute',
                top: '3px',
                right: '3px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: '#38bdf8'
              }} />
            </div>

            <h1 style={{ 
              fontSize: '1.4rem', 
              fontWeight: 700, 
              color: '#f5f5f7',
              letterSpacing: '-0.02em',
              margin: '0 0 0.4rem 0'
            }}>
              Sign in
            </h1>
            <p style={{ 
              color: '#9a9ba4', 
              fontSize: '0.875rem', 
              margin: 0
            }}>
              Enter your credentials to access the admin dashboard.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.08)', 
              color: '#f87171', 
              padding: '0.75rem 1rem', 
              borderRadius: '4px', 
              marginBottom: '1.5rem', 
              fontSize: '0.8125rem', 
              border: '1px solid rgba(239, 68, 68, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '0.8125rem', 
                fontWeight: 500,
                color: '#f5f5f7', 
                marginBottom: '0.5rem' 
              }}>
                Email address
              </label>
              <input
                type="email"
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 0.875rem', 
                  borderRadius: '4px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  backgroundColor: '#070709',
                  color: '#f5f5f7',
                  fontSize: '0.875rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="name@avatecinteractives.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ 
                  fontSize: '0.8125rem', 
                  fontWeight: 500,
                  color: '#f5f5f7'
                }}>
                  Password
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 2.5rem 0.75rem 0.875rem', 
                    borderRadius: '4px', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    backgroundColor: '#070709',
                    color: '#f5f5f7',
                    fontSize: '0.875rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#9a9ba4',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8125rem', color: '#9a9ba4' }}>
                <input 
                  type="checkbox" 
                  defaultChecked
                  style={{ 
                    width: '14px', 
                    height: '14px', 
                    accentColor: '#38bdf8', 
                    cursor: 'pointer',
                    backgroundColor: '#070709',
                    borderRadius: '2px'
                  }} 
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{ 
                width: '100%', 
                padding: '0.75rem 1.25rem', 
                fontSize: '0.875rem', 
                fontWeight: 600,
                backgroundColor: '#f5f5f7',
                color: '#070709',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 16px rgba(255, 255, 255, 0.08)',
                transition: 'all 0.15s ease'
              }}
              disabled={loading}
            >
              {loading ? (
                <>Signing in...</>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
