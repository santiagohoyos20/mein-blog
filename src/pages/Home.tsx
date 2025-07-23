import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import type { Post } from "../types/types";
import PostComponent from "../components/PostComponent";
import SocialMediaComponent from "../components/SocialMediaComponent";
import AdminButton from "../components/AdminButton";
import { Check, Plus, X } from "lucide-react";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    fetchPosts();
    checkSession();

    // Listener para cambios en el estado de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setIsLogged(!!session);
      }
    );

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

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Crear nuevo post");
    setShowNewPost(false);
  };

  return (
    <div className="bg-orange-100">
      <AdminButton isLogged={isLogged} />
      <main className="flex flex-col gap-[30px] min-h-screen p-8 max-w-[700px] mx-auto">
        <h1 className="text-5xl font-bold my-2">Mein Blog</h1>
        <div className="flex flex-row gap-4 items-center">
          <p className="text-lg">
            Hallo! Ich bin Santiago und das ist mein Blog. Hier teile ich meine
            Gedanken und Erlebnisse, um mein Deutsch zu üben.
          </p>
          {isLogged && (
            <div className="flex flex-row space-x-3 p-3 rounded-2xl shadow-lg backdrop-blur-sm bg-amber-50">
              <button
                onClick={() => setShowNewPost(true)}
                className="cursor-pointer p-3 bg-orange-100 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg text-[#4A4E69]"
              >
                <Plus />
              </button>
            </div>
          )}
        </div>
        {showNewPost && (
          <div className="bg-amber-50 rounded-lg shadow-lg transition-transform duration-300 hover:scale-102 hover:shadow-xl">
            <article className="p-8 rounded-lg shadow-sm">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="cursor-pointer text-[#4A4E69]">
                  <X />
                </button>
              </div>
              <form onSubmit={handleCreatePost}>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Titel"
                    className="p-2 text-3xl font-normal mb-4 focus:outline-none"
                  />
                  <textarea
                    placeholder="Inhalt"
                    className="p-4 text-lg mb-6 leading-relaxed focus:outline-none"
                  ></textarea>
                </div>
              
              <div className="flex justify-end w-full ">
                <button
                  type="submit"
                  className="cursor-pointer bg-orange-500 flex items-center justify-end hover:bg-orange-600 text-white px-2 py-1 rounded-lg transition"
                >
                  <Check />
                </button>
              </div>
              </form>
            </article>
          </div>
        )}
        {posts.map((post) => (
          <PostComponent key={post.id} post={post} isLogged={isLogged} />
        ))}
      </main>
      <SocialMediaComponent />
    </div>
  );
}

export default Home;
