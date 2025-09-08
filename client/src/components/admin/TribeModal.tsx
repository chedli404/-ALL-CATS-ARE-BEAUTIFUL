import { useState, useEffect } from 'react';

interface TribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tribe: any) => void;
  tribe?: any;
}

export default function TribeModal({ isOpen, onClose, onSave, tribe }: TribeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#1C6E5F',
    strengths: '',
    icon: 'compass'
  });

  // Update form data when tribe prop changes
  useEffect(() => {
    if (tribe) {
      setFormData({
        name: tribe.name || '',
        description: tribe.description || '',
        color: tribe.color || '#1C6E5F',
        strengths: tribe.strengths?.join(', ') || '',
        icon: tribe.icon || 'compass'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: '#1C6E5F',
        strengths: '',
        icon: 'compass'
      });
    }
  }, [tribe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tribeData = {
      ...formData,
      strengths: formData.strengths.split(',').map(s => s.trim()).filter(s => s)
    };
    onSave(tribeData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">
          {tribe ? 'Edit Tribe' : 'Add Tribe'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded h-24"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-1">Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-12 h-10 bg-gray-700 rounded cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded"
                placeholder="#1C6E5F"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-1">Strengths (comma separated)</label>
            <input
              type="text"
              value={formData.strengths}
              onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded"
              placeholder="Adaptability, Survival, Communication"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-1">Icon</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded"
              placeholder="compass"
            />
          </div>
          

          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/80 text-white py-2 rounded"
            >
              {tribe ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}