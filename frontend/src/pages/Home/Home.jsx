import("./Home.css");
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [saveFetch, setSaveFetch] = useState([]);
  const [only12, set12] = useState(12);

  useEffect(() => {
    fetch("http://localhost:2323/api/v1/movies")
      .then((resp) => resp.json())
      .then((allMovies) => setSaveFetch(allMovies))
      .catch((err) => console.error("Fehler in Home-Fetch", err));
  }, []);

  const loadMore = () => {
    set12(only12 + 12);
  };

  return (
    <>
      <header className="home-header">
        <nav>
          <div className="home-logo">
            <h1>MMDb</h1>
            <h2>⭐️</h2>
          </div>
          <div className="home-search">
            <input type="text" />
            <button>Submit</button>
          </div>

          <a href="#">add your own</a>
        </nav>
        <div className="home-slogan">
          <h3>MovieMagicDatabase has it all.</h3>
          <h3>
            But you can still <span>add</span> to it.
          </h3>
        </div>
      </header>
      <main>
        <h2>All Movies</h2>
        <Link to={"/favo"}>
          <button className="home-btn">Your Favorites</button>
        </Link>
        <section className="home-main">
          {saveFetch.slice(0, only12).map((item, index) => (
            <Link to={`/detail/${item._id}`} key={index}>
              <div className="home-card">
                <img src="../../../public/noimage.jpg" alt="" />
                <h4>{item.title}</h4>

                <p>{item.director}</p>
              </div>
            </Link>
          ))}
        </section>
        {saveFetch.length > only12 && (
          <button className="home-btn" onClick={loadMore}>
            Load More
          </button>
        )}
      </main>
    </>
  );
};

export default Home;
