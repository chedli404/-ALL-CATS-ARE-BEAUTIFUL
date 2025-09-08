import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

const VerifyEmailPage = () => {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/verify-email?token=${token}`);
        const data = await response.json();

        console.log('Verification response:', response.status, data);
        
        if (response.status === 200) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully! You can now log in.');
          // Redirect to login after 3 seconds
          setTimeout(() => {
            setLocation('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Network error occurred');
      }
    };

    verifyEmail();
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
            Redirecting to login page in 3 seconds...
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