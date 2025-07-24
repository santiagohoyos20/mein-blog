import React from "react";
import { LogOut, User } from "lucide-react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

const AdminButton: React.FC<{ isLogged: boolean }> = ({ isLogged }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (isLogged) {
        await supabase.auth.signOut();
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="fixed top-6 right-6">
      <div className="flex flex-row space-x-3 p-3 rounded-2xl shadow-lg backdrop-blur-sm bg-amber-50">
        <button
          onClick={handleClick}
          className="cursor-pointer p-3 bg-orange-100 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg text-[#4A4E69]"
        >
          {isLogged ? <LogOut /> : <User />}
        </button>
      </div>
    </div>
  );
};

export default AdminButton;
