import { useState, useEffect } from 'react';
import TribeModal from '../components/admin/TribeModal';

interface User {
  _id: string;
  username: string;
  email: string;
  level: number;
  createdAt: string;
}

interface Tribe {
  _id: string;
  name: string;
  description: string;
  color: string;
  strengths: string[];
  image?: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [tribes, setTribes] = useState<Tribe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);

  const [showTribeModal, setShowTribeModal] = useState(false);
  const [editingTribe, setEditingTribe] = useState<Tribe | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        await fetchUsers();
      } else if (activeTab === 'characters') {
        await fetchCharacters();
      } else if (activeTab === 'tribes') {
        await fetchTribes();
      } else if (activeTab === 'images') {
        await fetchTribes();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const res = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    }
  };

  const fetchTribes = async () => {
    try {
      const res = await fetch('/api/tribes');
      if (!res.ok) throw new Error('Failed to fetch tribes');
      const data = await res.json();
      setTribes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tribes');
    }
  };

  const handleImageUpload = async (tribeId: string, file: File | null) => {
    if (!file) return;

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`/api/admin/tribes/${tribeId}/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        fetchTribes();
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const deleteTribeImage = async (tribeId: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/tribes/${tribeId}/image`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        fetchTribes();
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  const updateUserLevel = async (userId: string, newLevel: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/users/${userId}/level`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ level: newLevel })
      });
      
      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to update user level:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const saveTribe = async (tribeData: any) => {
    try {
      const token = localStorage.getItem('token');
      const url = editingTribe 
        ? `/api/admin/tribes/${editingTribe._id}`
        : '/api/admin/tribes';
      const method = editingTribe ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tribeData)
      });
      
      if (res.ok) {
        const result = await res.json();
        fetchTribes();
        setEditingTribe(null);
      } else {
        const errorData = await res.json();
        console.error('Server error:', errorData);
      }
    } catch (error) {
      console.error('Failed to save tribe:', error);
    }
  };

  const deleteTribe = async (tribeId: string) => {
    if (!confirm('Are you sure you want to delete this tribe?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/tribes/${tribeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        fetchTribes();
      }
    } catch (error) {
      console.error('Failed to delete tribe:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  const tabs = [
    { id: 'users', label: 'Users', count: users.length },
    { id: 'characters', label: 'Characters', count: characters.length },
    { id: 'tribes', label: 'Tribes', count: tribes.length },
    { id: 'images', label: 'Images', count: 0 },
    { id: 'content', label: 'Content', count: 0 },
    ...(currentUser?.level >= 10 ? [{ id: 'settings', label: 'Settings', count: 0 }] : [])
  ];

  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab.label} {tab.count > 0 && `(${tab.count})`}
            </button>
          ))}
        </div>
        
        <div className="bg-glass rounded-lg p-6">
          {activeTab === 'users' && (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">Users ({users.length})</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-3 text-gray-300">Username</th>
                  <th className="pb-3 text-gray-300">Email</th>
                  <th className="pb-3 text-gray-300">Level</th>
                  <th className="pb-3 text-gray-300">Created</th>
                  {currentUser?.level >= 8 && <th className="pb-3 text-gray-300">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-800">
                    <td className="py-3 text-white">{user.username}</td>
                    <td className="py-3 text-gray-300">{user.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.level >= 10 ? 'bg-purple-600 text-white' :
                        user.level >= 9 ? 'bg-red-600 text-white' :
                        user.level >= 7 ? 'bg-orange-600 text-white' :
                        user.level >= 5 ? 'bg-blue-600 text-white' :
                        'bg-gray-600 text-gray-200'
                      }`}>
                        Level {user.level} {
                          user.level >= 10 ? '(Developer)' :
                          user.level === 9 ? '(Super Admin)' :
                          user.level === 8 ? '(Admin)' :
                          user.level === 7 ? '(Moderator)' :
                          user.level >= 5 ? '(Staff)' : '(User)'
                        }
                      </span>
                    </td>
                    <td className="py-3 text-gray-300">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    {currentUser?.level >= 8 && (
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <select 
                            className="bg-gray-700 text-white px-2 py-1 rounded text-xs"
                            value={user.level}
                            onChange={(e) => updateUserLevel(user._id, parseInt(e.target.value))}
                            disabled={user.level >= currentUser.level}
                          >
                            <option value={1}>Level 1 (User)</option>
                            <option value={5}>Level 5 (Staff)</option>
                            <option value={7}>Level 7 (Moderator)</option>
                            <option value={8}>Level 8 (Admin)</option>
                            {currentUser.level >= 9 && <option value={9}>Level 9 (Super Admin)</option>}
                            {currentUser.level >= 10 && <option value={10}>Level 10 (Developer)</option>}
                          </select>
                          {user._id !== currentUser.id && (
                            <button 
                              onClick={() => deleteUser(user._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
            </>
          )}
          
          {activeTab === 'tribes' && (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">Tribes ({tribes.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tribes.map((tribe) => (
                  <div key={tribe._id} className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-white font-semibold">{tribe.name}</h3>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: tribe.color }}></div>
                    <p className="text-gray-400 text-sm mt-2">{tribe.description.substring(0, 150)}...</p>
                    <div className="flex space-x-2 mt-3">
                      <button 
                        onClick={() => {
                          setEditingTribe(tribe);
                          setShowTribeModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteTribe(tribe._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <div className="bg-gray-800 rounded-lg p-4 border-2 border-dashed border-gray-600 flex items-center justify-center">
                  <button 
                    onClick={() => setShowTribeModal(true)}
                    className="text-gray-400 hover:text-white"
                  >
                    + Add Tribe
                  </button>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'content' && (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">Content Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg p-6 text-center">
                  <h3 className="text-white font-semibold mb-2">Image Upload</h3>
                  <p className="text-gray-400 text-sm mb-4">Upload and manage images</p>
                  <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded">
                    Manage Images
                  </button>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 text-center">
                  <h3 className="text-white font-semibold mb-2">Site Settings</h3>
                  <p className="text-gray-400 text-sm mb-4">Configure site settings</p>
                  <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded">
                    Settings
                  </button>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 text-center">
                  <h3 className="text-white font-semibold mb-2">Analytics</h3>
                  <p className="text-gray-400 text-sm mb-4">View site analytics</p>
                  <button className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded">
                    View Stats
                  </button>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'images' && (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">Tribe Images Management</h2>
              <p className="text-gray-400 text-sm mb-4">Total tribes: {tribes.length} | With images: {tribes.filter(tribe => tribe.image).length}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tribes.map((tribe) => (
                  <div key={tribe._id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div 
                        className="w-4 h-4 rounded mr-2"
                        style={{ backgroundColor: tribe.color }}
                      ></div>
                      <h3 className="text-white font-semibold">{tribe.name}</h3>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3">{tribe.description?.substring(0, 100)}...</p>
                    
                    <div className="mb-3">
                      <span className="text-gray-300 text-xs">Strengths: </span>
                      <span className="text-gray-400 text-xs">{tribe.strengths?.join(', ')}</span>
                    </div>
                    
                    <div className="mb-3">
                      {tribe.image ? (
                        <img 
                          src={tribe.image} 
                          alt={tribe.name}
                          className="w-full h-32 object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-700 rounded flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <input
                        id={`file-input-${tribe._id}`}
                        type="file"
                        accept="image/*"
                        className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary/80"
                        onChange={(e) => handleImageUpload(tribe._id, e.target.files?.[0] || null)}
                      />
                      <button 
                        onClick={() => document.getElementById(`file-input-${tribe._id}`)?.click()}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Choose Image
                      </button>
                      {tribe.image && (
                        <button 
                          onClick={() => deleteTribeImage(tribe._id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Remove Image
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {activeTab === 'settings' && currentUser?.level >= 10 && (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">System Settings (Developer Only)</h2>
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Site Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Site Title</label>
                      <input type="text" className="w-full bg-gray-700 text-white px-3 py-2 rounded" defaultValue="ACAB - All Cats Are Beautiful" />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-1">Site Description</label>
                      <input type="text" className="w-full bg-gray-700 text-white px-3 py-2 rounded" defaultValue="Post-apocalyptic cat universe" />
                    </div>
                  </div>
                  <button className="mt-4 bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded">
                    Save Settings
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        
        <TribeModal
          isOpen={showTribeModal}
          onClose={() => {
            setShowTribeModal(false);
            setEditingTribe(null);
          }}
          onSave={saveTribe}
          tribe={editingTribe}
        />
      </div>
    </div>
  );
}
