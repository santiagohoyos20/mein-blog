import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { Check } from "lucide-react";
import type { Post } from "../types/types";

interface CreatePostFormProps {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  posts: Post[];
  setShowNewPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ setPosts, posts, setShowNewPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita recarga de la página

    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            title: title,
            content: content,
            date: new Date().toISOString(),
          },
        ])
        .select(); // Devuelve el registro insertado

      if (error) {
        throw new Error(error.message);
      }

      console.log("Post insertado:", data);

      // Actualiza el estado y limpia el formulario
      setPosts([data[0], ...posts]);
      setTitle("");
      setContent("");
      setShowNewPost(false);
    } catch (err) {
      console.error("Error al insertar el post:", err);
      alert("Hubo un error al crear el post.");
    }
  };

  return (
    <form onSubmit={handleCreatePost}>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 text-3xl font-normal mb-4 focus:outline-none"
        />
        <textarea
          placeholder="Inhalt"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-4 text-lg mb-6 leading-relaxed focus:outline-none"
        ></textarea>
      </div>

      <div className="flex justify-end w-full">
        <button
          type="submit"
          className="cursor-pointer bg-orange-500 flex items-center justify-end hover:bg-orange-600 text-white px-2 py-1 rounded-lg transition"
        >
          <Check />
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
