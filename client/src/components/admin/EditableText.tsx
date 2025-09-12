import { useState } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Edit3, Check, X } from 'lucide-react';

interface EditableTextProps {
  children: React.ReactNode;
  onSave: (newText: string) => Promise<void>;
  className?: string;
  multiline?: boolean;
}

const EditableText = ({ children, onSave, className = '', multiline = false }: EditableTextProps) => {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(children?.toString() || '');
  const [loading, setLoading] = useState(false);

  if (!isEditMode) {
    return <span className={className}>{children}</span>;
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(text);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setText(children?.toString() || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`${className} border-2 border-blue-500 bg-white text-black p-2 rounded w-full`}
            rows={3}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`${className} border-2 border-blue-500 bg-white text-black p-2 rounded w-full`}
            autoFocus
          />
        )}
        <div className="flex space-x-1 mt-1">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white p-1 rounded"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white p-1 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <span
      className={`${className} relative group cursor-pointer hover:bg-blue-100 hover:bg-opacity-20 p-1 rounded`}
      onClick={() => setIsEditing(true)}
    >
      {children}
      <Edit3 
        size={12} 
        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-blue-600 text-white p-1 rounded" 
      />
    </span>
  );
};

export default EditableText;