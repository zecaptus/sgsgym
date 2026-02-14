import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-bold mb-6">SGS Gym</h1>
      <p className="text-lg text-gray-400 mb-8">Bienvenue sur la plateforme SGS Gym</p>
      <div className="bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer"
          onClick={() => setCount((c) => c + 1)}
        >
          Compteur : {count}
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Tailwind CSS v4 est configuré et fonctionnel.
        </p>
      </div>
    </div>
  )
}

export default App
