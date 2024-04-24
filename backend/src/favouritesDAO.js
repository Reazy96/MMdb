import { ObjectId } from "mongodb";
import { getDb } from "./db/getDb.js";

function findAll() {
  return getDb().then((db) => db.collection("favorites").find().toArray());
}

function findById(id) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb().then((db) => db.collection("favorites").findOne({ _id: idAsObjectId }));
}

function createOne(documentInfo) {
  return getDb()
    .then((db) => db.collection("favorites").insertOne(documentInfo))
    .then((result) => (result.acknowledged ? { ...documentInfo, _id: result.insertedId } : null));
}

function updateOne(id, updateInfo) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb()
    .then((db) => db.collection("favorites").updateOne({ _id: idAsObjectId }, { $set: updateInfo }))
    .then((result) => {
      if (result.acknowledged && result.modifiedCount === 1) return findById(id);
      else return null;
    });
}

function deleteOne(id) {
  const idAsObjectId = ObjectId.createFromHexString(id);
  return getDb().then((db) => db.collection("favorites").findOneAndDelete({ _id: idAsObjectId }));
}

export const favoritesDAO = { findAll, findById, createOne, updateOne, deleteOne };
