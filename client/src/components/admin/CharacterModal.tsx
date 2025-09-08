import { useState, useEffect } from 'react';

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (character: any) => void;
  character?: any;
}

export default function CharacterModal({ isOpen, onClose, onSave, character }: CharacterModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    tribe: 'Nomades',
    tribeColor: '#1C6E5F',
    description: '',
    traits: '',
    image: ''
  });

  // Update form data when character prop changes
  useEffect(() => {
    if (character) {
      setFormData({
        name: character.name || '',
        tribe: character.tribe || 'Nomades',
        tribeColor: character.tribeColor || '#1C6E5F',
        description: character.description || '',
        traits: character.traits?.join(', ') || '',
        image: character.image || ''
      });
    } else {
      setFormData({
        name: '',
        tribe: 'Nomades',
        tribeColor: '#1C6E5F',
        description: '',
        traits: '',
        image: ''
      });
    }
  }, [character]);

  const tribes = [
    { name: 'Nomades', color: '#1C6E5F' },
    { name: 'Anciens', color: '#E3A947' },
    { name: 'Technos', color: '#C73E3A' },
    { name: 'Écologistes', color: '#95de64' },
    { name: 'Mystiques', color: '#9C4DC4' },
    { name: 'Électriques', color: '#4fc3f7' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const characterData = {
      ...formData,
      traits: formData.traits.split(',').map(t => t.trim()).filter(t => t)
    };
    onSave(characterData);
    onClose();
  };

  const handleTribeChange = (tribeName: string) => {
    const tribe = tribes.find(t => t.name === tribeName);
    setFormData({
      ...formData,
      tribe: tribeName,
      tribeColor: tribe?.color || '#1C6E5F'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">
          {character ? 'Edit Character' : 'Add Character'}
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
            <label className="block text-gray-300 text-sm mb-1">Tribe</label>
            <select
              value={formData.tribe}
              onChange={(e) => handleTribeChange(e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded"
            >
              {tribes.map((tribe) => (
                <option key={tribe.name} value={tribe.name}>
                  {tribe.name}
                </option>
              ))}
            </select>
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
            <label className="block text-gray-300 text-sm mb-1">Traits (comma separated)</label>
            <input
              type="text"
              value={formData.traits}
              onChange={(e) => setFormData({ ...formData, traits: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded"
              placeholder="Explorer, Leader, Brave"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setFormData({ ...formData, image: e.target?.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-600 file:text-white"
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded" />
            )}
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/80 text-white py-2 rounded"
            >
              {character ? 'Update' : 'Create'}
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