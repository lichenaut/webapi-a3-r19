import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setMovie } from "../actions/movieActions";
import { Link } from "react-router-dom";
import { Nav, Carousel } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // console.log("movies:", movies);

  const handleSelect = (selectedIndex) => {
    if (movies && movies.success && Array.isArray(movies.movies)) {
      dispatch(setMovie(movies.movies[selectedIndex]));
    } else {
      console.error("movies is not an array");
    }
  };

  const handleClick = (movie) => {
    dispatch(setMovie(movie));
  };

  if (!movies || !movies.success || !Array.isArray(movies.movies)) {
    return <div>Loading....</div>;
  }

  return (
    <Carousel
      onSelect={handleSelect}
      className="bg-dark text-light p-4 rounded"
    >
      {movies.movies.map((movie) => (
        <Carousel.Item key={movie._id}>
          {/* Use Nav.Link with "as={Link}" to avoid nested anchors */}
          <Nav.Link
            as={Link}
            to={`/movies/${movie._id}`}
            onClick={() => handleClick(movie)}
          >
            <h3>{movie.title}</h3>
          </Nav.Link>
          <Carousel.Caption>
            <h3>{movie.title}</h3>
            <BsStarFill /> {movie.avgRating} &nbsp;&nbsp; {movie.releaseDate}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MovieList;
