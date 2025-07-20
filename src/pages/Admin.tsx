import { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"


function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      setMessage('Titel und Text sind erforderlich!')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      // Insert post into database
      const { error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            title: title.trim(),
            content: content.trim(),
            date: new Date().toISOString(),
          }
        ])

      if (insertError) {
        throw insertError
      }

      setMessage('Post erfolgreich erstellt!')
      
      // Reset form
      setTitle('')
      setContent('')

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (error) {
      console.error('Error creating post:', error)
      setMessage('Fehler beim Erstellen des Posts. Versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='bg-orange-100'>
      <div className="fixed top-6 left-6 z-10 group">
  {/* Tooltip */}
  <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div
      className="px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg relative"
      style={{ backgroundColor: "#22223B", color: "#F2E9E4" }}
    >
      Inicio
      {/* Flecha */}
      <div
        className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0"
        style={{
          borderBottom: "6px solid #22223B",
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
        }}
      />
    </div>
  </div>

  <Link
    to="/"
    className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-amber-100"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-amber-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h4m10-11v10a1 1 0 01-1 1h-4m-6 0h6"
      />
    </svg>
  </Link>
</div>


      <main className="flex flex-col gap-[30px] min-h-screen p-8 max-w-[700px] mx-auto">
        <h1 className="text-5xl font-bold my-2">Neuen Post erstellen</h1>
        <p className="text-lg">
          Teilen Sie Ihre Gedanken und Erlebnisse in einem neuen Blogbeitrag.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-lg font-semibold text-gray-700">
              Titel *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              placeholder="Geben Sie den Titel Ihres Posts ein..."
              maxLength={200}
              required
            />
          </div>

          {/* Content Textarea */}
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-lg font-semibold text-gray-700">
              Text *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-vertical"
              placeholder="Schreiben Sie hier Ihren Blogbeitrag..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-3 px-6 rounded-lg text-lg font-semibold transition-colors ${
              isSubmitting
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400'
            }`}
          >
            {isSubmitting ? 'Wird erstellt...' : 'Post erstellen'}
          </button>

          {/* Message Display */}
          {message && (
            <div className={`p-4 rounded-lg text-lg ${
              message.includes('erfolgreich') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </form>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600 italic">
            💡 Tipp: Schreiben Sie authentisch und teilen Sie Ihre persönlichen Erfahrungen!
          </p>
        </div>
      </main>
    </div>
  )
}

export default CreatePost