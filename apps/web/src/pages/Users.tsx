import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, XCircle, Shield, Briefcase } from 'lucide-react';
import { fetchWithAuth } from '../lib/api';

interface PendingUser {
  id: string;
  email: string;
  status: string;
  createdAt: { _seconds: number };
}

export default function UserApprovals() {
  const { userProfile } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  
  // Provisioning State
  const [role, setRole] = useState('Standard User');
  const [department, setDepartment] = useState('Engineering');
  const [permissions, setPermissions] = useState<string[]>(['projects:view', 'tasks:view', 'messages:view']);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchWithAuth('/users/pending');
      setPendingUsers(data);
    } catch (err) {
      console.error('Failed to fetch pending users', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await fetchWithAuth(`/users/${selectedUser.id}/approve`, {
        method: 'PATCH',
        body: JSON.stringify({
          roleId: role,
          department,
          permissions
        })
      });
      setSelectedUser(null);
      fetchPendingUsers();
    } catch (err) {
      console.error('Failed to approve user', err);
      alert('Failed to approve user');
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm('Are you sure you want to suspend this request?')) return;
    try {
      await fetchWithAuth(`/users/${id}/suspend`, {
        method: 'PATCH'
      });
      fetchPendingUsers();
    } catch (err) {
      console.error('Failed to suspend user', err);
    }
  };

  if (!userProfile?.permissions?.includes('users:manage') && !userProfile?.permissions?.includes('*')) {
    return <div className="p-8 text-destructive font-semibold">Access Restricted: You do not have permission to view this page.</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Provisioning</h1>
          <p className="text-muted-foreground mt-1">Review and approve pending employee accounts.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex-1">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading pending requests...</div>
        ) : pendingUsers.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
            <p className="text-muted-foreground">There are no pending user registrations awaiting approval.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Email</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Requested At</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="px-6 py-4 font-medium text-sm text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pendingUsers.map(user => (
                <tr key={user.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 font-bold">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-medium">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">
                    {user.createdAt ? new Date(user.createdAt._seconds * 1000).toLocaleDateString() : 'Unknown'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                      Pending Approval
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Review
                      </button>
                      <button 
                        onClick={() => handleReject(user.id)}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Provisioning Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-secondary/30">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-500" />
                Provision Account
              </h2>
              <button onClick={() => setSelectedUser(null)} className="text-muted-foreground hover:text-foreground">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleApprove} className="p-8 space-y-6">
              <div className="p-4 rounded-xl bg-secondary/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-600 text-xl font-bold">
                  {selectedUser.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-lg">{selectedUser.email}</div>
                  <div className="text-sm text-muted-foreground">ID: {selectedUser.id}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select 
                      value={department}
                      onChange={e => setDepartment(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Product">Product</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Role Assignment</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select 
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
                    >
                      <option value="Standard User">Standard User</option>
                      <option value="Team Lead">Team Lead</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Granular Permissions</label>
                <div className="grid grid-cols-2 gap-3 p-4 border border-border rounded-xl bg-secondary/20">
                  {['projects:view', 'projects:edit', 'tasks:view', 'tasks:edit', 'messages:view', 'files:view'].map(perm => (
                    <label key={perm} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={permissions.includes(perm)}
                        onChange={(e) => {
                          if (e.target.checked) setPermissions([...permissions, perm]);
                          else setPermissions(permissions.filter(p => p !== perm));
                        }}
                        className="w-4 h-4 rounded border-border text-purple-600 focus:ring-purple-500" 
                      />
                      <span className="text-sm">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setSelectedUser(null)}
                  className="px-5 py-2.5 rounded-xl font-medium border border-border hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-medium text-white bg-green-600 hover:bg-green-700 transition-colors shadow-lg shadow-green-500/20"
                >
                  Approve & Provision Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
