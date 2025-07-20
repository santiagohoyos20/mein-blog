import { Link } from 'react-router-dom'
import SocialMediaComponent from '../components/SocialMediaComponent'

function NotFound() {
  return (
    <div className='bg-orange-100'>
      <main className="flex flex-col gap-[30px] min-h-screen p-8 max-w-[700px] mx-auto">
        <h1 className="text-5xl font-bold my-2">404</h1>
        <h2 className="text-3xl font-bold text-gray-700">Seite nicht gefunden</h2>
        <p className="text-lg">
          Entschuldigung! Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
        </p>
        <p className="text-lg">
          Kehren Sie zur <Link to="/" className="text-blue-600 hover:text-blue-800 underline font-semibold">Startseite</Link> zurück, 
          um weitere Blogbeiträge zu entdecken.
        </p>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600 italic">
            "Nicht alle, die wandern, sind verloren" - aber diese Seite schon! 😅
          </p>
        </div>
      </main>
      <SocialMediaComponent />
    </div>
  )
}

export default NotFound