import { useState, useEffect } from 'react'
import type { User } from "@sgsgym/db";

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("http://localhost:3001/api/users")
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`)
        return res.json()
      })
      .then((data: User[]) => setUsers(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Erreur inconnue")
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-2 text-center">SGS Gym</h1>
        <p className="text-lg text-gray-400 mb-10 text-center">
          Bienvenue sur la plateforme SGS Gym
        </p>

        <h2 className="text-2xl font-semibold mb-4">Utilisateurs</h2>

        {loading && (
          <p className="text-gray-400 animate-pulse">Chargement...</p>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 rounded-lg p-4">
            {error}
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <p className="text-gray-500">Aucun utilisateur.</p>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Nom</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Inscrit le</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-800/60 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-gray-400">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {user.name ?? <span className="text-gray-500 italic">Non renseigne</span>}
                    </td>
                    <td className="px-6 py-4 text-indigo-400">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
