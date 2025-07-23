import React from "react";
import type { Post } from "../types/types";
import { Edit, Trash } from "lucide-react";

const PostComponent: React.FC<{ post: Post; isLogged: boolean }> = ({
  post,
  isLogged,
}) => {
  return (
    <>
      {isLogged ? (
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
              <div className="flex gap-4">
                <button className="bg-orange-500 flex items-center gap-2 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
                  <Edit size={18} />
                </button>
                <button className="bg-orange-500 flex items-center gap-2 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition">
                  <Trash size={18} />
                </button>
              </div>
            </div>
          </article>
        </div>
      ) : (
        <div className="bg-amber-50 rounded-lg shadow-lg transition-transform duration-300 hover:scale-102 hover:shadow-xl">
          <article className="p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-normal mb-4">{post.title}</h1>

            <p className="text-lg mb-6 leading-relaxed">{post.content}</p>

            <time className="text-sm font-medium">
              {new Date(post.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </article>
        </div>
      )}
    </>
  );
};

export default PostComponent;
