import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import type { Post } from "../types/types";
import PostComponent from "../components/PostComponent";
import SocialMediaComponent from "../components/SocialMediaComponent";
import AdminButton from "../components/AdminButton";
import { Plus, X } from "lucide-react";
import CreatePostForm from "../components/CreatePostForm";
import ToggleLanguage from "../components/ToggleLanguage";

const texts = {
  es: {
    greeting:
      "Hola, soy Santiago y este es mi blog. Aquí comparto mis pensamientos y experiencias para practicar mi alemán.",
  },
  en: {
    greeting:
      "Hi, I am Santiago and this is my blog. Here I share my thoughts and experiences to practice my German.",
  },
  de: {
    greeting:
      "Hallo! Ich bin Santiago und das ist mein Blog. Hier teile ich meine Gedanken und Erlebnisse, um mein Deutsch zu üben.",
  },
};

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [language, setLanguage] = useState<string>("de");

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

  // Configuración de idiomas

  return (
    <div className="bg-orange-100">
      <ToggleLanguage language={language} setLanguage={setLanguage} />
      <main className="flex flex-col gap-[30px] min-h-screen p-8 max-w-[700px] mx-auto">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-5xl font-bold my-2">Mein Blog</h1>
          <AdminButton isLogged={isLogged} />
        </div>

        <div className="flex flex-row gap-4 items-center">
          <p className="text-lg">{texts[language].greeting}</p>
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
                  className="cursor-pointer text-[#4A4E69]"
                >
                  <X />
                </button>
              </div>
              <CreatePostForm
                setPosts={setPosts}
                posts={posts}
                setShowNewPost={setShowNewPost}
              />
            </article>
          </div>
        )}
        {posts.map((post) => (
          <PostComponent
            key={post.id}
            post={post}
            isLogged={isLogged}
            setPosts={setPosts}
          />
        ))}
      </main>
      <SocialMediaComponent />
    </div>
  );
}

export default Home;
