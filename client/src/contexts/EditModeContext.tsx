import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  editToken: string | null;
  activateEditMode: (secretKey: string) => Promise<boolean>;
  deactivateEditMode: () => void;
  canUseEditMode: boolean;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within EditModeProvider');
  }
  return context;
};

interface EditModeProviderProps {
  children: ReactNode;
}

export const EditModeProvider = ({ children }: EditModeProviderProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editToken, setEditToken] = useState<string | null>(null);
  const [canUseEditMode, setCanUseEditMode] = useState(false);

  useEffect(() => {
    const checkUserLevel = () => {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        const canUse = userData.level >= 10;
        setCanUseEditMode(canUse);
      } else {
        setCanUseEditMode(false);
      }
    };
    
    checkUserLevel();
    
    // Listen for storage changes
    window.addEventListener('storage', checkUserLevel);
    return () => window.removeEventListener('storage', checkUserLevel);
  }, []);

  const activateEditMode = async (secretKey: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/activate-edit-mode', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secretKey })
      });

      if (res.ok) {
        const data = await res.json();
        setEditToken(data.editToken);
        setIsEditMode(true);
        
        // Auto-deactivate after expiration
        setTimeout(() => {
          deactivateEditMode();
        }, data.expiresIn);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to activate edit mode:', error);
      return false;
    }
  };

  const deactivateEditMode = () => {
    setIsEditMode(false);
    setEditToken(null);
  };

  return (
    <EditModeContext.Provider value={{
      isEditMode,
      editToken,
      activateEditMode,
      deactivateEditMode,
      canUseEditMode
    }}>
      {children}
    </EditModeContext.Provider>
  );
};