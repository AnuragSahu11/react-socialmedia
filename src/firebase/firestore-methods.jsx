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
  increment,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase-config";
const short = require("short-uuid");

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
    const followRef = doc(db, userID, "follow");
    batch.set(followRef, { following: [], followers: [] });
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
      comments: {},
      likes: 0,
    });
    const userPostRef = doc(db, userID, "posts");
    await updateDoc(userPostRef, { posts: arrayUnion(docRef.id) });
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (postID) => {
  try {
    updateDoc(userPostRef, { posts: arrayRemove(docRef.id) });
    await deleteDoc(doc(db, "Posts", postID));
  } catch (err) {}
};

const updatePost = async (postID, updatedPost) => {
  try {
    const postRef = doc(db, "Posts", postID);
    await updateDoc(postRef, {
      updatedPost,
    });
  } catch (err) {}
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

const addComment = async (postID, commentData, commentName) => {
  const newID = short.generate();
  const newComment = `comments.${newID}`;
  try {
    const commentDoc = doc(db, "Posts", postID);
    await updateDoc(commentDoc, {
      [newComment]: { commentData, commentName },
    });
  } catch (err) {}
};

const likePost = async (postID) => {
  try {
    const commentDoc = doc(db, "Posts", postID);
    await updateDoc(commentDoc, {
      likes: increment(1),
    });
  } catch (err) {}
};

const dislikePost = async (postID) => {
  try {
    const commentDoc = doc(db, "Posts", postID);
    await updateDoc(commentDoc, {
      likes: increment(-1),
    });
  } catch (err) {}
};

const follow = async (currentUserID, userToFollowID) => {
  try {
    const followingRef = doc(db, currentUserID, "follow");
    const followerRef = doc(db, userToFollowID, "follow");
    updateDoc(followingRef, {
      following: arrayUnion(userToFollowID),
    });
    updateDoc(followerRef, { followers: arrayUnion(currentUserID) });
  } catch (err) {}
};

const unFollow = async (currentUserID, userToFollowID) => {
  try {
    const followingRef = doc(db, currentUserID, "follow");
    const followerRef = doc(db, userToFollowID, "follow");
    updateDoc(followingRef, {
      following: arrayRemove(userToFollowID),
    });
    updateDoc(followerRef, { followers: arrayRemove(currentUserID) });
  } catch (err) {}
};

export {
  createUser,
  newPost,
  getPosts,
  getUserPost,
  getUserData,
  addComment,
  likePost,
  dislikePost,
  deletePost,
  updatePost,
  follow,
  unFollow,
};
