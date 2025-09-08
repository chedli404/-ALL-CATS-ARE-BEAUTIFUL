import { useState, useEffect } from 'react';

interface User {
  _id: string;
  username: string;
  email: string;
  level: number;
  createdAt: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    fetchUsers();
  }, []);

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
    } finally {
      setLoading(false);
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
        fetchUsers(); // Refresh the list
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
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        <div className="bg-glass rounded-lg p-6">
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
                        user.level >= 9 ? 'bg-red-600 text-white' :
                        user.level >= 7 ? 'bg-orange-600 text-white' :
                        user.level >= 5 ? 'bg-blue-600 text-white' :
                        'bg-gray-600 text-gray-200'
                      }`}>
                        Level {user.level} {
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
        </div>
      </div>
    </div>
  );
}