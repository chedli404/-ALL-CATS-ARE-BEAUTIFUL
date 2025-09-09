
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
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{
      backgroundImage: 'url(/attached_assets/1.pdf-image-028.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Kabila Logo/Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2" style={{
          textShadow: '0 0 30px rgba(212, 165, 116, 0.8), 0 0 60px rgba(212, 165, 116, 0.4)'
        }}>KABILA</h1>
        <p className="text-orange-300 text-lg md:text-xl font-medium">Join the Revolution</p>
      </div>
      
      <div className="flex flex-col items-center justify-center h-full relative z-10" style={{ paddingTop: '120px' }}>
        <div className='auth-bold-line'></div>
        <div className='auth-container'>
          <div className='auth-window' style={{
            background: 'rgba(40, 30, 20, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(200, 150, 100, 0.4)'
          }}>
            <div className='auth-overlay'></div>
            <div className='auth-content'>
              <div className='auth-welcome' style={{ color: '#D4A574', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Become a Legend!</div>
              <div className='auth-subtitle' style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Choose your path in the post-apocalyptic world of Kabila.</div>
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
              <button type="submit" className='auth-ghost-round auth-full-width' style={{
                background: 'linear-gradient(135deg, #D4A574 0%, #B8956A 100%)',
                border: 'none',
                color: 'white',
                fontWeight: 'bold'
              }}>
                🎆 Begin Your Journey
              </button>
              {message && <div className="auth-spacing">{message}</div>}
            </form>
            <div className="text-center mt-3 p-2 rounded-lg" style={{ background: 'rgba(212, 165, 116, 0.1)' }}>
              <p className="text-orange-300 text-xs">"Every survivor has a story. What will yours be?"</p>
            </div>
            <div>
              <button className='auth-ghost-round auth-full-width' onClick={() => window.location.href = '/login'} style={{
                background: 'transparent',
                border: '2px solid #D4A574',
                color: '#D4A574'
              }}>
                Already a Member? Enter Here
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 text-gray-500 text-xs">
        <p>🌅 New Dawn • 🤝 Unity • 💫 Hope</p>
      </div>
      <div className="absolute bottom-10 right-10 text-gray-500 text-xs">
        <p>Your Legend Starts Now</p>
      </div>
    </div>
              
  );
}
