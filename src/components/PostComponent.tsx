import React from "react";
import type { Post } from "../types/types";
import { Edit, Trash } from "lucide-react";
import { supabase } from "../services/supabaseClient";

interface CreatePostFormProps {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  post: Post;
  isLogged: boolean;
}

const PostComponent: React.FC<CreatePostFormProps> = ({
  setPosts,
  post,
  isLogged,
}) => {
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este post?")) {
      try {
        const { error } = await supabase
          .from("posts")
          .delete()
          .eq("id", post.id);

        if (error) {
          throw new Error(error.message);
        }

        setPosts(prev => prev.filter(p => p.id !== post.id));
      } catch (error) {
        console.error("Error al eliminar el post:", error);
        alert("No se pudo eliminar el post.");
      }
    }
  };
  return (
    <>
      <div className="bg-amber-50 rounded-lg shadow-lg transition-transform duration-300 hover:scale-102 hover:shadow-xl">
        <article className="p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-normal mb-4">{post.title}</h1>

          <p className="text-lg mb-6 leading-relaxed">{post.content}</p>

          <div className="flex flex-row justify-between items-center">
            <time className="text-sm font-medium">
              {new Date(post.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            {isLogged && (
              <div className="flex gap-4">
                <button className="cursor-pointer bg-orange-500 flex items-center gap-2 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
                  <Edit size={18} />
                </button>
                <button
                  onClick={handleDelete}
                  className="cursor-pointer bg-orange-500 flex items-center gap-2 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <Trash size={18} />
                </button>
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
};

export default PostComponent;
