import React from "react";
import { Star } from "lucide-react";

export const MovieCard = React.memo(({ movie, onClick }) => {
  // Poster safe banane ke liye fallback
  const posterUrl =
    movie?.Poster && movie.Poster !== "N/A"
      ? movie.Poster // OMDb poster
      : `https://image.tmdb.org/t/p/w300${movie.Poster}` // TMDb poster

  // Rating handle (OMDb -> imdbRating, TMDb -> vote_average)
  const rating = movie.imdbRating

  return (
    <div  
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
      onClick={() => onClick(movie)}
    >
      <div className="relative">
        <img
          src={posterUrl}
          alt={movie?.Title || movie?.name || "No Title"}
          className="w-full h-64 object-cover"
          loading="lazy"
        />

        {rating !== null && !isNaN(rating) && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
          {movie?.Title || movie?.name || "Untitled"}
        </h3>
        <p className="text-gray-400 text-xs">
          {movie?.Year || movie?.release_date || "Unknown"}
        </p>
      </div>
    </div>
  );
});
