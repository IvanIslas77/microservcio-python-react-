// src/components/UserStats.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function UserStats() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/users/stats/summary');
        // Tu endpoint devuelve { success: true, data: { ... } }
        setStats(res.data.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar estadísticas');
      }
    };
    fetchStats();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) return <p className="text-gray-500">Cargando estadísticas…</p>;

  return (
    <div className="p-4 bg-blue-50 rounded-lg shadow mb-6">
      <h3 className="text-xl font-semibold mb-2">Estadísticas de Usuarios</h3>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Total:</strong> {stats.total_users}</li>
        <li><strong>Edad Promedio:</strong> {stats.average_age.toFixed(1)}</li>
        <li><strong>Más Joven:</strong> {stats.youngest_user} años</li>
        <li><strong>Más Viejo:</strong> {stats.oldest_user} años</li>
      </ul>
    </div>
  );
}
