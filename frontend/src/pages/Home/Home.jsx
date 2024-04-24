import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [saveFetch, setSaveFetch] = useState([]);
  const [onlyTen, setOnlyTen] = useState(10);

  useEffect(() => {
    fetch("http://localhost:2323/api/v1/movies")
      .then((resp) => resp.json())
      .then((allMovies) => setSaveFetch(allMovies))
      .catch((err) => console.error("Fehler in Home-Fetch", err));
  }, []);

  const loadMore = () => {
    setOnlyTen(onlyTen + 10);
  };

  return (
    <section>
      <h2>Home</h2>

      <Link to={"/favo"}>
        <button>Your Favorites</button>
      </Link>
      {saveFetch.slice(0, onlyTen).map((item, index) => (
        <div key={index}>
          <p>{item.title}</p>
        </div>
      ))}

      {saveFetch.length > onlyTen && <button onClick={loadMore}>Load More</button>}
    </section>
  );
};

export default Home;
