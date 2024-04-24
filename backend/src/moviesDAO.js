import { ObjectId } from "mongodb";
import { getDb } from "./db/getDb.js";

function findAll() {
  return getDb().then((db) => db.collection("movieDetails").find().toArray());
}

function findById(id) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb().then((db) => db.collection("movieDetails").findOne({ _id: idAsObjectId }));
}

// const findAllFavorited = () => {
//   return getDb()
//     .then((db) => db.collection("favorites").find().toArray()) // [{ _id: favid , movieID: movieID}]
//     .then((favoritesDocs) => favoritesDocs.map((item) => item.movieID)) // [ObjectId,...]
//     .then((favIds) => Promise.all([getDb(), favIds]))
//     .then(([db, favIds]) =>
//       db
//         .collection("movieDetails")
//         .find({ _id: { $in: favIds } })
//         .toArray()
//     );
// };

function createOne(documentInfo) {
  return getDb()
    .then((db) => db.collection("movieDetails").insertOne(documentInfo)) // { acknowledged: true, insertedId: ObjectId("...") }
    .then(
      (result) => (result.acknowledged ? { ...documentInfo, _id: result.insertedId } : null) // kopie com dokumnt mit _id (===> gleicher wert wie in der datenbank)
    );
}

function updateOne(id, updateInfo) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb()
    .then((db) => db.collection("movieDetails").updateOne({ _id: idAsObjectId }, { $set: updateInfo }))
    .then((result) => {
      if (result.acknowledged && result.modifiedCount === 1) return findById(id);
      else return null;
    });
}

function deleteOne(id) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb().then((db) => db.collection("movieDetails").findOneAndDelete({ _id: idAsObjectId }));
}

export const moviesDAO = { findAll, findById, findAllFavorited, createOne, updateOne, deleteOne };
