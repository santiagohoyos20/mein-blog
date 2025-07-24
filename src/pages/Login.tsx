import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  // 🔹 Redirigir si ya existe una sesión activa
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        navigate('/', { replace: true })
      }
    }
    checkSession()
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim() || !password.trim()) {
      setMessage('E-Mail und Passwort sind erforderlich!')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      })

      if (error) throw error

      if (data.user) {
        setMessage('Erfolgreich angemeldet! Weiterleitung...')
        setTimeout(() => navigate('/'), 1500)
      }
    } catch (error: any) {
      console.error('Login error:', error)
      if (error.message.includes('Invalid login credentials')) {
        setMessage('Ungültige E-Mail oder Passwort. Versuchen Sie es erneut.')
      } else if (error.message.includes('Email not confirmed')) {
        setMessage('Bitte bestätigen Sie Ihre E-Mail-Adresse.')
      } else {
        setMessage('Anmeldefehler. Versuchen Sie es später erneut.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='bg-orange-100 min-h-screen'>
      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Login</h1>
            <p className="text-lg text-gray-600">
              Melden Sie sich an, um neue Posts zu erstellen
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-lg font-semibold text-gray-700">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="ihre-email@example.com"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-lg font-semibold text-gray-700">
                  Passwort *
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`py-3 px-6 rounded-lg text-lg font-semibold transition-colors ${
                  isLoading
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Anmeldung läuft...
                  </div>
                ) : (
                  'Anmelden'
                )}
              </button>

              {/* Message Display */}
              {message && (
                <div className={`p-4 rounded-lg text-lg text-center ${
                  message.includes('Erfolgreich') 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {message}
                </div>
              )}
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg 
                  className="w-5 h-5 text-orange-500" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="font-semibold text-gray-700">Admin-Bereich</span>
              </div>
              <p className="text-gray-600 text-sm">
                Nur autorisierte Benutzer können sich hier anmelden
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login;
