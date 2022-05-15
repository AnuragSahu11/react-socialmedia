import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  writeBatch,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
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
    batch.set(postRef, { posts: [] });
    await batch.commit();
  } catch {
    console.error("Error adding document: ", err);
  }
};

const newPost = async (postTitle, postContent, postImg, userID) => {
  try {
    const docRef = await addDoc(collection(db, "Posts"), {
      title: postTitle,
      content: postContent,
      img: postImg,
      time: serverTimestamp(),
    });
    const userPostRef = doc(db, userID, "posts");
    await updateDoc(userPostRef, { [docRef.id]: serverTimestamp() });
  } catch (error) {
    console.error(error);
  }
};

const getPosts = createAsyncThunk("get/allPost", async () => {
  const postData = {};
  try {
    const querySnapshot = await getDocs(collection(db, "Posts"));
    querySnapshot.forEach((doc) => {
      postData[doc.id] = doc.data();
    });
    console.log(postData);
    return postData;
  } catch (err) {
    console.error("Error during fetching data: ", err);
  }
});

const getUserPost = createAsyncThunk("get/userPost", async (userID) => {
  try {
    const docSnapshot = await getDoc(doc(db, userID, "posts"));
    console.log(docSnapshot);
    return docSnapshot.data();
  } catch (err) {
    console.error("Error during fetching data: ", err);
  }
});

const getUserData = createAsyncThunk("get/userdata", async (userID) => {
  const userData = {};
  try {
    const docSnapshot = await getDocs(collection(db, userID));
    docSnapshot.forEach((doc) => {
      userData[doc.id] = doc.data();
    });
    return userData;
  } catch (err) {
    console.error("Error during fetching data: ", err);
  }
});

export { createUser, newPost, getPosts, getUserPost, getUserData };
