
            import { useState } from "react";
import './RegisterPage.css';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    
    if (res.ok) {
      if (data.token) {
        // Old flow - immediate login
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage("Registration successful! Redirecting...");
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        // New flow - email verification required
        setMessage(data.message || "Registration successful! Please check your email to verify your account.");
      }
    } else {
      setMessage(data.error || "Registration failed");
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
            <form onSubmit={handleRegister}>
              <div className='auth-input-fields'>
                <input 
                  type='text'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder='Username'
                  className='auth-input-line auth-full-width'
                  required
                />
                <input 
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Email'
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
              </div>
              <button type="submit" className='auth-ghost-round auth-full-width'>Create Account</button>
              {message && <div className="auth-spacing">{message}</div>}
            </form>
            <div className='auth-spacing'>or continue with <span className='auth-highlight'>Facebook</span></div>
            <div>
              <button className='auth-ghost-round auth-full-width' onClick={() => window.location.href = '/login'}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
