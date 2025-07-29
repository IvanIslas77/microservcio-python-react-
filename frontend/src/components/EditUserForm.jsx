// src/components/EditUserForm.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { api } from '../services/api';

export default function EditUserForm({ user, onCancel, onUserUpdated }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si cambia el user seleccionado, actualiza los inputs
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedData = { name, email, age: parseInt(age, 10) };
      const res = await api.put(`/users/${user.id}`, updatedData);
      onUserUpdated(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Error al actualizar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-yellow-50 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Campos igual que UserForm */}
      <div className="mb-4">
        <label htmlFor='name' className="block mb-1">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor='email' className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor='age' className="block mb-1">Edad</label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          required
          min="0"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

EditUserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.number,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onUserUpdated: PropTypes.func.isRequired,
};
