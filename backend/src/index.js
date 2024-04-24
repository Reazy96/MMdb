import express from "express";
import morgan from "morgan";
import cors from "cors";

import { moviesDAO } from "./moviesDAO.js";
import { favoritesDAO } from "./favouritesDAO.js";
import { ObjectId } from "mongodb";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Route zum Abrufen aller Filme
app.get("/api/v1/movies", (req, res) => {
  moviesDAO
    .findAll()
    .then((movies) => res.json(movies))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err, message: "Could not retrieve all movies" });
    });
});

// Route zum Abrufen eines bestimmten Films
app.get("/api/v1/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  moviesDAO
    .findById(movieId)
    .then((foundMovie) => res.json(foundMovie || { message: "Movie not found for id: " + movieId }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err, message: "Could not retrieve movie with id: " + movieId });
    });
});

// Route zum Hinzufügen eines neuen Films
app.post("/api/v1/movies", (req, res) => {
  const newMovie = req.body;
  moviesDAO
    .createOne(newMovie)
    .then((addedMovie) => res.json(addedMovie || {}))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err, message: "Could not add new movie" });
    });
});

// Route zum Aktualisieren eines Films
app.patch("/api/v1/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const updateInfo = req.body;
  moviesDAO
    .updateOne(movieId, updateInfo)
    .then((updatedMovie) => res.json(updatedMovie || {}))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err, message: "Could not update movie with id: " + movieId });
    });
});

// Route zum Löschen eines Films
app.delete("/api/v1/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  moviesDAO
    .deleteOne(movieId)
    .then((deletedMovie) => res.json(deletedMovie || {}))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ err, message: "Could not delete movie with id: " + movieId });
    });
});

app.get("/api/v1/favorites", (req, res) => {
  favoritesDAO
    .findAll()
    .then((favs) => res.json(favs || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not get ur favorites" });
    });
});

app.post("/api/v1/movies/:movieID/favorites", (req, res) => {
  const movieID = req.params.movieID;
  const myFav = {
    movieID: ObjectId.createFromHexString(movieID),
  };
  favoritesDAO
    .createOne(myFav)
    .then((myFav) => res.json(myFav || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not post favorite" });
    });
});

app.delete("/api/v1/favorites/:favId", (req, res) => {
  favoritesDAO
    .deleteOne(req.params.favId)
    .then((deleted) => res.json(deleted || {}))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, message: "Could not Delete Movie!" });
    });
});

const PORT = 2323;
app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));

// fetche alle favos

// id`s in ein array

//
// ids=[   327342734734773
//   442373247324783 327342734734773
//   442373247324783 327342734734773
//   442373247324783 327342734734773
//   442373247324783 327342734734773
//   442373247324783   ]

// mape ich die id's

// save,setsave=usestate

// uds.map((item)=>{
//   useeffect
// fetch:/api/v1/movies/item
// setsave(data)

// })
