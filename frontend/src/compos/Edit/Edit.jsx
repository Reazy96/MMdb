import { useState } from "react";
import { useParams } from "react-router-dom";

const Edit = ({ movie, setMovie }) => {
  const [edited, setEdited] = useState({
    title: movie.title,
    year: movie.year,
    director: movie.director,
    genres: movie.genres,
    plot: movie.plot,
  });
  const { movieId } = useParams();
  const editMovie = (e) => {
    e.preventDefault();
    fetch(`http://localhost:2323/api/v1/movies/${movieId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edited),
    })
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.log(err));
  };

  return (
    <form>
      <input type="text" value={edited.title} onChange={(e) => setEdited({ ...edited, title: e.target.value })} />
      <input type="text" value={edited.year} onChange={(e) => setEdited({ ...edited, year: e.target.value })} />
      <input
        type="text"
        value={edited.director}
        onChange={(e) => setEdited({ ...edited, director: e.target.value })}
      />
      <input
        type="text"
        value={edited.genres}
        onChange={(e) => setEdited({ ...edited, genres: e.target.value })}
      />
      <textarea
        value={edited.plot}
        onChange={(e) => setEdited({ ...edited, plot: e.target.value })}
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <button onClick={editMovie}>Submit</button>
    </form>
  );
};

export default Edit;
