import { useState, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

// Cache to prevent repeated API calls for the same content
const contentCache = new Map<string, string>();

interface SmartEditableProps {
  contentKey: string;
  type: 'text' | 'image';
  page: string;
  section: string;
  defaultValue: string;
  children?: React.ReactNode;
  className?: string;
  multiline?: boolean;
  alt?: string;
}

const SmartEditable = ({ 
  contentKey, 
  type, 
  page, 
  section, 
  defaultValue, 
  children, 
  className = '',
  multiline = false,
  alt = ''
}: SmartEditableProps) => {
  const { isEditMode, editToken } = useEditMode();
  const [content, setContent] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  // Load content from database only when in edit mode
  useEffect(() => {
    if (!isEditMode) {
      setContent(defaultValue);
      return;
    }
    
    // Check cache first
    if (contentCache.has(contentKey)) {
      setContent(contentCache.get(contentKey) || defaultValue);
      return;
    }
    
    const loadContent = async () => {
      try {
        const res = await fetch(`/api/content/${contentKey}`);
        if (res.ok) {
          const data = await res.json();
          contentCache.set(contentKey, data.value);
          setContent(data.value);
        } else {
          contentCache.set(contentKey, defaultValue);
          setContent(defaultValue);
        }
      } catch (error) {
        contentCache.set(contentKey, defaultValue);
        setContent(defaultValue);
      }
    };
    
    loadContent();
  }, [contentKey, isEditMode, defaultValue]);

  const handleSave = async (newValue: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/content/${contentKey}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${editToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: newValue,
          type,
          page,
          section
        })
      });

      if (res.ok) {
        setContent(newValue);
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (type === 'image') {
    return (
      <EditableImage
        src={content}
        alt={alt}
        onSave={handleSave}
        className={className}
      />
    );
  }

  return (
    <EditableText
      onSave={handleSave}
      className={className}
      multiline={multiline}
    >
      {content}
    </EditableText>
  );
};

export default SmartEditable;