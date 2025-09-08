import { useState } from 'react';
import './LoginPage.css';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // can be username or email
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    console.log("Login attempt with:", { identifier, password: "***" });
    
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    
    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", data);
    
    if (res.ok && data.token) {
      // Store token in localStorage
      console.log('Login response user:', data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage("Login successful! Redirecting...");
      
      // Redirect to home page after short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } else {
      setMessage(data.error || "Login failed");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-dark">
      <div className='auth-bold-line'></div>
      <div className='auth-container'>
        <div className='auth-window'>
          <div className='auth-overlay'></div>
          <div className='auth-content'>
            <div className='auth-welcome'>Hello There!</div>
            <div className='auth-subtitle'>We're almost done. Before using our services you need to create an account.</div>
            <form onSubmit={handleLogin} className='auth-input-fields'>
              <input 
                type='text'
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                placeholder='Email or Username' 
                className='auth-input-line auth-full-width'
                required
              />
              <input 
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Password' 
                className='auth-input-line auth-full-width'
                required
              />
              <div>
                <button type="button" className='auth-ghost-round auth-full-width' onClick={() => window.location.href = '/register'}>
                  Create Account
                </button>
                <button type="submit" className='auth-ghost-round auth-full-width'>
                  Login
                </button>
              </div>
              <div className="auth-subtitle">{message}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}