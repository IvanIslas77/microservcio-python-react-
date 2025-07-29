// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import UserForm from './userForm';
import EditUserForm from './EditUserForm';
import UserStats from './userStats';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener usuarios del servidor
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Callback cuando se crea un usuario
  const handleUserCreated = (newUser) => {
    setUsers(prev => [newUser, ...prev]);
  };

  // Callback cuando se actualiza un usuario
  const handleUserUpdated = (updatedUser) => {
    setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error al eliminar usuario');
    }
  };

  // Filtrar usuarios según búsqueda
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-gray-500">Cargando usuarios...</p>;
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* Estadísticas de Usuarios */}
      <UserStats />

      {/* Formulario de creación o edición */}
      {editingUser ? (
        <EditUserForm
          user={editingUser}
          onUserUpdated={handleUserUpdated}
          onCancel={() => setEditingUser(null)}
        />
      ) : (
        <UserForm onUserCreated={handleUserCreated} />
      )}

      {/* Barra de Búsqueda */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Edad</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-sm">{user.id}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.age}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="p-4 text-center text-gray-500">No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
}
