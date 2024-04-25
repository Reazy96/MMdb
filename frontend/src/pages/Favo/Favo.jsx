import { useEffect, useState } from "react";

const Favo = () => {
  const [saveFetch, setSaveFetch] = useState([]);
  const [idS, setIdS] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2323/api/v1/favorites")
      .then((resp) => resp.json())
      .then((allFavos) => setSaveFetch(allFavos))
      .catch((err) => console.error("Fehler in Favo-Fetch", err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await Promise.all(
        saveFetch.map((item) =>
          fetch(`http://localhost:2323/api/v1/movies/${item.movieID}`)
            .then((resp) => resp.json())
            .catch((err) => console.error("Fehler in Favo-Fetch", err))
        )
      );
      setIdS(fetchedData);
    };
    fetchData();
  }, [saveFetch]);

  function deleteFavo(favoId) {
    fetch(`http://localhost:2323/api/v1/favorites/${favoId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setSaveFetch(saveFetch.filter((favo) => favo._id !== favoId));
      })
      .catch((err) => console.error("Fehler beim Löschen des Favoriten", err));
  }

  return (
    <section>
      <h2>Your Favos</h2>
      {idS.map((item, index) => (
        <div key={index}>
          <p>{item.title}</p>
          <button onClick={() => deleteFavo(saveFetch[index]._id)}>❌</button>
        </div>
      ))}
    </section>
  );
};

export default Favo;
