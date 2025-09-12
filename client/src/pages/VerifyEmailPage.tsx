import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

const VerifyEmailPage = () => {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const token = urlParams.get('token');
    const userParam = urlParams.get('user');
    
    if (status === 'success' && token && userParam) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', decodeURIComponent(userParam));
      setStatus('success');
      setMessage('Email verified! Logging you in...');
      
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } else if (status) {
      const message = urlParams.get('message');
      setStatus(status as any);
      setMessage(message ? decodeURIComponent(message) : 'Verification failed');
      
      setTimeout(() => {
        setLocation('/login');
      }, 3000);
    } else {
      setStatus('error');
      setMessage('No verification status found');
    }
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        <div className="mb-6">
          {status === 'loading' && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          )}
          {status === 'success' && (
            <div className="text-green-500 text-5xl mb-4">✓</div>
          )}
          {status === 'error' && (
            <div className="text-red-500 text-5xl mb-4">✗</div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">
          {status === 'loading' && 'Verifying Email...'}
          {status === 'success' && 'Email Verified!'}
          {status === 'error' && 'Verification Failed'}
        </h1>

        <p className="text-gray-300 mb-6">{message}</p>

        {status === 'success' && (
          <p className="text-sm text-gray-400">
            Redirecting to home page in 2 seconds...
          </p>
        )}

        {status === 'error' && (
          <button
            onClick={() => setLocation('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;