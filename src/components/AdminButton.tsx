import React from "react";
import { LogOut, User } from "lucide-react";
import { supabase } from "../services/supabaseClient";
import { Navigate } from "react-router-dom";

const AdminButton: React.FC<{ isLogged: boolean }> = ({ isLogged }) => {
  console.log("AdminButton rendered, isLogged:", isLogged);
  return (
    <div className="fixed top-6 right-6">
      <div className="flex flex-row space-x-3 p-3 rounded-2xl shadow-lg backdrop-blur-sm bg-amber-50">
        <button
          onClick={() => {
            if (isLogged) {
              supabase.auth.signOut();
            } else {
              Navigate("admin/login");
            }
          }}
          className="p-3 bg-orange-100 rounded-full transition-colors duration-300 hover:scale-110 hover:shadow-lg"
          style={{ color: "#4A4E69" }}
        >
          {isLogged ? <LogOut /> : <User />}
        </button>
      </div>
    </div>
  );
};

export default AdminButton;
