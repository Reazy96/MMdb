import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Edit from "../../compos/Edit/Edit";

const Detail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:2323/api/v1/movies/${movieId}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <section className="details">
      <div className="detail-movie">
        <img src="../../../public/noimage.jpg" alt="" />
        <h2>{movie.title}</h2>
        <p>{movie.year}</p>
        <p>{movie.director}</p>
        <p>{movie.plot}</p>
        {movie.genres.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>

      <Edit movie={movie} setMovie={setMovie} />
    </section>
  );
};

export default Detail;
