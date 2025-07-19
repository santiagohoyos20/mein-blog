import React from 'react';
import type { Post } from '../types';

const PostComponent: React.FC<{ post: Post }> = ({ post }) => {
  return (
      <div className='bg-amber-50 rounded-lg shadow-lg transition-transform duration-300 hover:scale-102 hover:shadow-xl'>
        <article 
          className="p-8 rounded-lg shadow-sm"
        >
          <h1 
            className="text-3xl font-normal mb-4"
          >
            {post.title}
          </h1>
          
          <p 
            className="text-lg mb-6 leading-relaxed"
          >
            {post.content}
          </p>
          
          <time 
            className="text-sm font-medium"
          >
            {new Date(post.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </article>
      </div>
  );
};

export default PostComponent;