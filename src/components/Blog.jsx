import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Blog = ({ posts }) => {
  return (
    <section id="blog" className="py-16 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto" aria-labelledby="blog-heading">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 md:mb-16">
        <div>
          <h2 id="blog-heading" className="text-3xl md:text-5xl font-black tracking-tight uppercase">SunSpark Insights</h2>
          <p className="text-on-surface-variant text-sm md:text-base">The latest in renewable tech and sustainability.</p>
        </div>
        <button className="text-primary font-bold flex items-center gap-2" aria-label="View all blog posts">
          View All Posts <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {posts.map((post, index) => (
          <article 
            key={index} 
            className="group cursor-pointer"
          >
            <div className="aspect-video rounded-2xl overflow-hidden mb-6">
              <img 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                src={post.image} 
                alt={post.title} 
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">{post.category}</span>
            <h4 className="text-xl font-bold mt-2 mb-4 group-hover:text-primary transition-colors">{post.title}</h4>
            <p className="text-on-surface-variant text-sm line-clamp-2">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
};