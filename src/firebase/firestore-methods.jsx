import { doc, writeBatch } from "firebase/firestore";
import { db } from "./firebase-config";

const createUser = async (firstName, lastName, email, userID) => {
  const batch = writeBatch(db);
  try {
    const userRef = doc(db, userID, "userData");
    batch.set(userRef, {
      firstName,
      lastName,
      email,
      bio: "",
      dp: "",
      website: "",
    });
    const postRef = doc(db, userID, "posts");
    batch.set(postRef, {});
    await batch.commit();
  } catch {
    console.error("Error adding document: ", err);
  }
};

export { createUser };
