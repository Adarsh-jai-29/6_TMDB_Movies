  import React, { useState, useEffect, useCallback, useMemo, Suspense} from 'react';
  import './App.css';
  import {MovieDetails} from './component/MovieDetails';
  import {MovieCard} from './component/MovieCard';
  import {MovieSection} from './component/MovieSection';
  import mockMovies from './data/movies.json';
  import {SearchBar} from './component/SearchBar';

  const LoadingSpinner = React.memo(() => (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  ));

  const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    // Memoized API functions
    const fetchPopularMovies = useCallback(async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setPopularMovies(mockMovies.popular);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      } finally {
        setLoading(false);
      }
    }, []);

    const fetchTopRatedMovies = useCallback(async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        setTopRatedMovies(mockMovies.topRated);
      } catch (error) {
        console.error('Error fetching top rated movies:', error);
      }
    }, []);

    const searchMovies = useCallback(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      
      setSearchLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const results = [...mockMovies.popular, ...mockMovies.topRated]
          .filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setSearchLoading(false);
      }
    }, []);

    // Debounced search effect
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        searchMovies(searchTerm);
      }, 300);

      return () => clearTimeout(timeoutId);
    }, [searchTerm, searchMovies]);

    // Initial data fetch
    useEffect(() => {
      fetchPopularMovies();
      fetchTopRatedMovies();
    }, [fetchPopularMovies, fetchTopRatedMovies]);

    const handleMovieClick = useCallback((movie) => {
      setSelectedMovie(movie);
    }, []);

    const handleCloseModal = useCallback(() => {
      setSelectedMovie(null);
    }, []);

    const handleSearchChange = useCallback((value) => {
      setSearchTerm(value);
    }, []);

    // Memoized components
    const memoizedSearchBar = useMemo(() => (
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
    ), [searchTerm, handleSearchChange]);

    const memoizedContent = useMemo(() => {
      if (searchTerm.trim()) {
        return (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Search Results</h2>
            {searchLoading ? (
              <LoadingSpinner />
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map(movie => (
                  <Suspense key={movie.id} fallback={<div className="bg-gray-800 rounded-lg h-80 animate-pulse" />}>
                    <MovieCard movie={movie} onClick={handleMovieClick} />
                  </Suspense>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No movies found for "{searchTerm}"</p>
            )}
          </div>
        );
      }
      return (
        <div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Suspense fallback={<div className="mb-8"><LoadingSpinner /></div>}>
                <MovieSection 
                  title="Popular Movies" 
                  movies={popularMovies} 
                  onMovieClick={handleMovieClick}
                />
              </Suspense>
              
              <Suspense fallback={<div className="mb-8"><LoadingSpinner /></div>}>
                <MovieSection 
                  title="Top Rated Movies" 
                  movies={topRatedMovies} 
                  onMovieClick={handleMovieClick}
                />
              </Suspense>
            </>
          )}
        </div>
      );
    }, [searchTerm, searchLoading, searchResults, loading, popularMovies, topRatedMovies, handleMovieClick]);

    return (
      <div className="min-w-[99vw] bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-1 py-6">
            <h1 className="text-3xl font-bold text-white animate-bounce">Movie <span className='text-red-400'>Discovery</span> </h1>
            <p className="text-gray-400 mt-2">Discover your next favorite movie</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {memoizedSearchBar}
          {memoizedContent}
        </main>

        {/* Movie Details Modal */}
        {selectedMovie && (
          <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"><LoadingSpinner /></div>}>
            <MovieDetails movie={selectedMovie} onClose={handleCloseModal} />
          </Suspense>
        )}
      </div>
    );
  };
  export default App;