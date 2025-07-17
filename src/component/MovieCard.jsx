 import React, { lazy } from 'react';
import { Star } from 'lucide-react'

 export const MovieCard = lazy(() => Promise.resolve({
    default: React.memo(({ movie, onClick }) => (
      <div 
        className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
        onClick={() => onClick(movie)}
      >
        <div className="relative">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : '/api/placeholder/300/450'}
            alt={movie.title}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium">{movie.vote_average?.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">{movie.title}</h3>
          <p className="text-gray-400 text-xs">{new Date(movie.release_date).getFullYear()}</p>
        </div>
      </div>
    ))
  }));