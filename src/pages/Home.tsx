import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import type { Post } from "../types/types";
import PostComponent from "../components/PostComponent";
import SocialMediaComponent from "../components/SocialMediaComponent";
import AdminButton from "../components/AdminButton";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
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

  return (
    <div className="bg-orange-100">
      <AdminButton isLogged={isLogged} />
      <main className="flex flex-col gap-[30px] min-h-screen p-8 max-w-[700px] mx-auto">
        <h1 className="text-5xl font-bold my-2">Mein Blog</h1>
        <p className="text-lg">
          Hallo! Ich bin Santiago und das ist mein Blog. Hier teile ich meine
          Gedanken und Erlebnisse, um mein Deutsch zu üben.
        </p>
        {posts.map((post) => (
          <PostComponent key={post.id} post={post} isLogged={isLogged} />
        ))}
      </main>
      <SocialMediaComponent />
    </div>
  );
}

export default Home;
