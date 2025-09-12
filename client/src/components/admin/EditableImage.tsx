import { useState, useRef } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Upload, Check, X } from 'lucide-react';

interface EditableImageProps {
  src: string;
  alt: string;
  onSave: (newImageData: string) => Promise<void>;
  className?: string;
}

const EditableImage = ({ src, alt, onSave, className = '' }: EditableImageProps) => {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isEditMode) {
    return <img src={src} alt={alt} className={className} />;
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!preview) return;
    
    setLoading(true);
    try {
      await onSave(preview);
      setIsEditing(false);
      setPreview(null);
    } catch (error) {
      console.error('Failed to save image:', error);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setPreview(null);
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isEditing) {
    return (
      <div className="relative">
        <img 
          src={preview || src} 
          alt={alt} 
          className={`${className} border-2 border-blue-500 rounded`} 
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
          >
            <Upload size={16} />
          </button>
          {preview && (
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
            >
              <Check size={16} />
            </button>
          )}
          <button
            onClick={handleCancel}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded"
          >
            <X size={16} />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div 
      className="relative group cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <img src={src} alt={alt} className={className} />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
        <Upload size={24} className="text-white" />
      </div>
    </div>
  );
};

export default EditableImage;