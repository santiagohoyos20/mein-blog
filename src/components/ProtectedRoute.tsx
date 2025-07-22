import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

useEffect(() => {
  let isMounted = true;

  // Obtener la sesión inicial
  supabase.auth.getSession()
    .then(({ data, error }) => {
      if (error) console.error("Error obteniendo la sesión:", error);
      if (isMounted) {
        setSession(data.session);
        setLoading(false);
      }
    });

  // Escuchar cambios de sesión en tiempo real
  const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
    if (isMounted) setSession(session);
  });

  // Cleanup cuando el componente se desmonta
  return () => {
    isMounted = false;
    subscription.subscription.unsubscribe();
  };
}, []);


  if (loading) return <div>Cargando...</div>;

  return session ? children : <Navigate to="/admin/login" />;
}
