import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import type { Post } from './types'
import PostComponent from './components/PostComponent'
import SocialMediaComponent from './components/SocialMediaComponent'

function App() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false })
    if (error) {
      console.error('Error cargando posts:', error.message)
    } else if (data) {
      setPosts(data as Post[])
    }
  }

  return (
    <div className='bg-orange-100'>
      <main className=" flex flex-col gap-[30px] min-h-screen p-8 max-w-[700px] mx-auto">
        <h1 className="text-5xl font-bold  my-2">Mein Blog</h1>
        <p className="text-lg">Hallo! Ich bin Santiago und das ist mein Blog. Hier teile ich meine Gedanken und Erlebnisse, um mein Deutsch zu üben.</p>
        {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
        ))}
      </main>
      <SocialMediaComponent />
    </div>
  )
}

export default App

