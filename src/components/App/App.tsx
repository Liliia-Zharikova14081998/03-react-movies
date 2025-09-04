import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const handleSubmit = async (searchQuery: string) => {
    setIsLoading(true);
    setMovies([]);
    try {
      const movies = await fetchMovies(searchQuery);
    
      if (movies.length === 0) {
        toast.error("No movies found for your request.");
        setIsLoading(false);
        return;
      }
      setMovies(movies);
      setIsLoading(false);
      setIsError(false);
      
} catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.error(error);
  }
};

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };
  
  return (
    <div className={css.app}>
      {isLoading && <Loader />}
      <SearchBar
        onSubmit={handleSubmit}
      />
      {isError
        ?  <ErrorMessage />
        : <MovieGrid movies={movies} onSelect={handleSelect} />
      }
      <Toaster position="top-center" reverseOrder={false} />
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
      
    </div>
  );
}