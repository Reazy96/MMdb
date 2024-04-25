import { ObjectId } from "mongodb";
import { getDb } from "./db/getDb.js";

function findAll() {
  return getDb().then((db) => db.collection("movieDetails").find().toArray());
}

function findById(id) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb().then((db) => db.collection("movieDetails").findOne({ _id: idAsObjectId }));
}

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

export const moviesDAO = { findAll, findById, createOne, updateOne, deleteOne };
