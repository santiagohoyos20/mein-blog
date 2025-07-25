import React, { useState } from "react";
import type { Post } from "../types/types";
import { Check, Edit, Trash } from "lucide-react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

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

        setPosts((prev) => prev.filter((p) => p.id !== post.id));
      } catch (error) {
        console.error("Error al eliminar el post:", error);
        alert("No se pudo eliminar el post.");
      }
    }
  };

  const handleEdit = async () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("posts")
        .update({ title, content })
        .eq("id", post.id);

      if (error) throw new Error(error.message);

      // Actualiza el post localmente
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, title, content } : p))
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Error al editar el post:", error);
      alert("No se pudo editar el post.");
    }
  };
  return (
    <>
      <div className="bg-amber-50 rounded-lg shadow-lg transition-transform duration-300 hover:scale-102 hover:shadow-xl">
        <article className="p-8 rounded-lg shadow-sm">
          {isEditing ? (
            <>
              <div className="flex flex-col gap-4">
                <input
                  className="p-2 text-3xl font-normal mb-4 focus:outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="p-4 text-lg mb-6 leading-relaxed focus:outline-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-normal mb-4">{post.title}</h1>
              <p className="text-lg mb-6 leading-relaxed">{post.content}</p>
            </>
          )}

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
                {isEditing && (
                  <button
                    onClick={handleSave}
                    type="submit"
                    className="cursor-pointer bg-orange-500 flex items-center justify-end hover:bg-orange-600 text-white px-2 py-1 rounded-lg transition"
                  >
                    <Check />
                  </button>
                )}
                <button
                  onClick={handleEdit}
                  className="cursor-pointer bg-orange-500 flex items-center gap-2 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                >
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
