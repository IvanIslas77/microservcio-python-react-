// src/components/UserForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';            // ← Importa PropTypes
import { api } from '../services/api';

export default function UserForm({ onUserCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newUser = { name, email, age: parseInt(age, 10) };
      const response = await api.post('/users', newUser);
      onUserCreated(response.data);
      setName('');
      setEmail('');
      setAge('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Error al crear usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Crear Usuario</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

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
        <label htmlFor='number' className="block mb-1">Edad</label>
        <input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          required
          min="0"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Creando...' : 'Crear Usuario'}
      </button>
    </form>
  );
}

// 🔽 Agrega estas líneas debajo de tu componente:
UserForm.propTypes = {
  onUserCreated: PropTypes.func.isRequired,
};
