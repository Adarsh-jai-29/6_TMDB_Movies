import React, { lazy, Suspense } from 'react';
import { MovieCard } from './MovieCard';

export const MovieSection = lazy(() => Promise.resolve({
    default: React.memo(({ title, movies, onMovieClick }) => (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movies.map(movie => (
            <Suspense key={movie.imdbID} fallback={<div className="bg-gray-800 rounded-lg h-80 animate-pulse" />}>
              <MovieCard movie={movie} onClick={onMovieClick} />
            </Suspense>
          ))}
        </div>
      </div>
    ))
  }));