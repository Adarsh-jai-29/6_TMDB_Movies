import React, { lazy } from 'react';
import { Star, Calendar, Clock, Play, Heart, Bookmark } from 'lucide-react'

  // Lazy load components for code splitting
 export const MovieDetails = lazy(() => Promise.resolve({
    default: React.memo(({ movie, onClose }) => (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/api/placeholder/300/450'}
                  alt={movie.title}
                  className="w-full h-auto rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </div>
              
              <div className="md:w-2/3 p-6">
                <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
                <div className="flex items-center gap-4 text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{movie.vote_average?.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{movie.runtime || 'N/A'} min</span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">{movie.overview}</p>
                
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-medium">
                    <Play className="w-4 h-4" />
                    Watch Trailer
                  </button>
                  <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white">
                    <Heart className="w-4 h-4" />
                    Favorite
                  </button>
                  <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white">
                    <Bookmark className="w-4 h-4" />
                    Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }));