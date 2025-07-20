import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import type { Post } from "../types/types";
import PostComponent from "../components/PostComponent";
import SocialMediaComponent from "../components/SocialMediaComponent";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    fetchPosts();
    checkSession();

    // Listener para cambios en el estado de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLogged(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("date", { ascending: false });
    if (error) {
      console.error("Error cargando posts:", error.message);
    } else if (data) {
      setPosts(data as Post[]);
    }
  }

  async function checkSession() {
    const { data } = await supabase.auth.getSession();
    setIsLogged(!!data.session);
  }

  return (
    <div className="bg-orange-100">
      {/* Admin/Profile Icon - Top Right */}
      <div className="fixed top-6 right-6 z-10 group">
        {/* Tooltip */}
        <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div
            className="px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg relative"
            style={{ backgroundColor: "#22223B", color: "#F2E9E4" }}
          >
            {isLogged ? "Admin Panel" : "Admin Login"}
            {/* Arrow */}
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
          to={isLogged ? "/admin" : "/admin/login"}
          className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-amber-100"
        >
          <svg
            className="w-6 h-6 text-amber-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </Link>
      </div>
      <main className="flex flex-col gap-[30px] min-h-screen p-8 max-w-[700px] mx-auto">
        <h1 className="text-5xl font-bold my-2">Mein Blog</h1>
        <p className="text-lg">
          Hallo! Ich bin Santiago und das ist mein Blog. Hier teile ich meine
          Gedanken und Erlebnisse, um mein Deutsch zu üben.
        </p>
        {posts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </main>
      <SocialMediaComponent />
    </div>
  );
}

export default Home;
