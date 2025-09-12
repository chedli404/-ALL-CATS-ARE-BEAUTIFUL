import { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Edit3, X, Check } from 'lucide-react';

const EditModeToggle = () => {
  const { isEditMode, activateEditMode, deactivateEditMode, canUseEditMode } = useEditMode();
  const [showSecretInput, setShowSecretInput] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!canUseEditMode) return null;

  const handleActivate = async () => {
    setLoading(true);
    setError('');
    
    const success = await activateEditMode(secretKey);
    
    if (success) {
      setShowSecretInput(false);
      setSecretKey('');
    } else {
      setError('Invalid secret key or insufficient permissions');
    }
    
    setLoading(false);
  };

  const handleDeactivate = () => {
    deactivateEditMode();
    setShowSecretInput(false);
    setSecretKey('');
    setError('');
  };

  if (isEditMode) {
    return (
      <div className="fixed top-20 right-4 z-[9999]" style={{ zIndex: 9999 }}>
        <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2" style={{ position: 'relative', zIndex: 9999 }}>
          <Edit3 size={16} />
          <span className="font-medium">Edit Mode Active</span>
          <button
            onClick={handleDeactivate}
            className="ml-2 hover:bg-red-700 p-1 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 z-[9999]" style={{ zIndex: 9999 }}>
      {!showSecretInput ? (
        <button
          onClick={() => setShowSecretInput(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
          style={{ position: 'relative', zIndex: 9999 }}
        >
          <Edit3 size={16} />
          <span>Modify</span>
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px]">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Developer Secret Key
            </label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter secret key..."
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm mb-3">{error}</div>
          )}
          
          <div className="flex space-x-2">
            <button
              onClick={handleActivate}
              disabled={!secretKey || loading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-md flex items-center justify-center space-x-1"
            >
              <Check size={16} />
              <span>{loading ? 'Activating...' : 'Activate'}</span>
            </button>
            <button
              onClick={() => {
                setShowSecretInput(false);
                setSecretKey('');
                setError('');
              }}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModeToggle;