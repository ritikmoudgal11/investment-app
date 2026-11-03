// ==============================================================================
// FILE: frontend/app/components/CommunityEngine.tsx
// WHAT IT IS: Laminar Pulse Community Stream with Strict Image-Only Capture & Upload
// ==============================================================================

'use client';

import React, { useState, useRef } from 'react';

interface Post {
  id: string;
  author: string;
  handle: string;
  content: string;
  image?: string;
  likes: number;
  dislikes: number;
  commentsCount: number;
  userLiked?: boolean;
  userDisliked?: boolean;
}

export default function CommunityEngine() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'p-1',
      author: 'Ritik Moudgal',
      handle: '@laminar_lead',
      content: 'Executing clean structural analysis on XAU/USD key liquidity zones. Risk management remains absolute.',
      likes: 42,
      dislikes: 1,
      commentsCount: 5
    },
    {
      id: 'p-2',
      author: 'QuantDesk',
      handle: '@quant_pulse',
      content: 'Clean asset allocation models deployed on the new Flow builder. Complete cash flow clarity changes everything.',
      likes: 28,
      dislikes: 0,
      commentsCount: 3
    }
  ]);

  const [newContent, setNewContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Hidden file input refs for gallery vs camera capture
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Handle selected image file
  const handleFileProcessed = (file?: File) => {
    if (!file) return;
    
    // Strict safety check: ensure mime type is strictly an image
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed. Videos, reels, and other media formats are restricted.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim() && !selectedImage) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: 'Ritik Moudgal',
      handle: '@laminar_lead',
      content: newContent,
      image: selectedImage || undefined,
      likes: 0,
      dislikes: 0,
      commentsCount: 0
    };

    setPosts([newPost, ...posts]);
    setNewContent('');
    setSelectedImage(null);
  };

  const handleReaction = (id: string, type: 'like' | 'dislike') => {
    setPosts(posts.map(post => {
      if (post.id !== id) return post;

      if (type === 'like') {
        if (post.userLiked) {
          return { ...post, likes: post.likes - 1, userLiked: false };
        } else {
          return {
            ...post,
            likes: post.likes + 1,
            userLiked: true,
            dislikes: post.userDisliked ? post.dislikes - 1 : post.dislikes,
            userDisliked: false
          };
        }
      } else {
        if (post.userDisliked) {
          return { ...post, dislikes: post.dislikes - 1, userDisliked: false };
        } else {
          return {
            ...post,
            dislikes: post.dislikes + 1,
            userDisliked: true,
            likes: post.userLiked ? post.likes - 1 : post.likes,
            userLiked: false
          };
        }
      }
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 font-sans">
      
      {/* HEADER */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold uppercase bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
          Pulse Community Stream
        </span>
        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Laminar Pulse</h3>
        <p className="text-slate-500 text-sm">
          Noise-free financial streams. Share insights, charts, and milestones.
        </p>
      </div>

      {/* CREATE POST BOX */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
        <form onSubmit={handleCreatePost} className="space-y-4">
          <textarea
            rows={3}
            placeholder="Share your market analysis, charts, or progress..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-purple-500 focus:outline-none transition-all text-sm resize-none"
          />

          {/* IMAGE PREVIEW CONTAINER */}
          {selectedImage && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-h-60 flex items-center justify-center">
              <img src={selectedImage} alt="Upload preview" className="max-h-60 object-contain w-full" />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 bg-slate-900/70 hover:bg-slate-900 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
            
            {/* TWO BUTTONS ONLY: CAPTURE OR UPLOAD FROM GALLERY */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* BUTTON 1: CAPTURE PHOTO (MOBILE CAMERA) */}
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-all text-xs font-semibold border border-purple-200 flex items-center justify-center gap-1.5"
              >
                <span>📷 Capture Photo</span>
              </button>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFileProcessed(e.target.files?.[0])}
                className="hidden"
              />

              {/* BUTTON 2: UPLOAD FROM GALLERY */}
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all text-xs font-semibold border border-slate-200 flex items-center justify-center gap-1.5"
              >
                <span>🖼️ Upload Gallery</span>
              </button>
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileProcessed(e.target.files?.[0])}
                className="hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs hover:bg-purple-700 transition-all shadow-md shadow-purple-500/20"
            >
              Publish Post ➔
            </button>
          </div>
        </form>
      </div>

      {/* FEED STREAMS */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-4">
            
            {/* AUTHOR INFO */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm">
                  {post.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{post.author}</h4>
                  <span className="text-xs text-slate-400">{post.handle}</span>
                </div>
              </div>
            </div>

            {/* CONTENT TEXT */}
            <p className="text-slate-700 text-sm leading-relaxed">{post.content}</p>

            {/* ATTACHED IMAGE */}
            {post.image && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                <img src={post.image} alt="Post attachment" className="w-full max-h-96 object-cover" />
              </div>
            )}

            {/* 3-TAP INTERACTION MODEL */}
            <div className="flex items-center gap-4 pt-3 border-t border-slate-100 text-xs font-semibold">
              <button
                onClick={() => handleReaction(post.id, 'like')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                  post.userLiked
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                👍 {post.likes}
              </button>

              <button
                onClick={() => handleReaction(post.id, 'dislike')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                  post.userDisliked
                    ? 'bg-rose-100 text-rose-700 border border-rose-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                👎 {post.dislikes}
              </button>

              <button
                onClick={() => alert(`Comments section for post: ${post.id}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
              >
                💬 {post.commentsCount} Comments
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}