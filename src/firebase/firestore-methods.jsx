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
      fullName: firstName + lastName,
      email,
      handle: "",
      bio: "",
      dp: "",
      website: "",
    });
    const postRef = doc(db, userID, "posts");
    const likedPostRef = doc(db, userID, "likedPost");
    const followRef = doc(db, userID, "follow");
    const bookmarkRef = doc(db, userID, "bookmarks");

    batch.set(postRef, { posts: [] });
    batch.set(followRef, { following: [], followers: [] });
    batch.set(likedPostRef, { likedPost: [] });
    batch.set(bookmarkRef, { bookmarks: [] });

    await batch.commit();
  } catch {
    console.error("Error adding document: ", err);
  }
};

const updateUserData = async (userID, userData) => {
  try {
    const userDocRef = doc(db, userID, "userData");
    await updateDoc(userDocRef, userData);
  } catch (err) {}
};

const newPost = async (
  postCaption,
  postContent,
  userID,
  userHandle,
  postImg = "hmm"
) => {
  try {
    const docRef = await addDoc(collection(db, "Posts"), {
      caption: postCaption,
      content: postContent,
      img: postImg,
      time: serverTimestamp(),
      comments: [],
      likes: 0,
      postBy: userHandle,
      postByID: userID,
    });
    const userPostRef = doc(db, userID, "posts");
    await updateDoc(userPostRef, { posts: arrayUnion(docRef.id) });
  } catch (error) {
    throw error.message;
  }
};

const deletePost = async (postID, userID) => {
  try {
    const userPostRef = doc(db, userID, "posts");
    updateDoc(userPostRef, { posts: arrayRemove(postID) });
    await deleteDoc(doc(db, "Posts", postID));
  } catch (err) {}
};

const updatePost = async (postID, updatedPost) => {
  const { caption, content } = updatedPost;
  try {
    const postRef = doc(db, "Posts", postID);
    await updateDoc(postRef, {
      caption,
      content,
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
    return postData;
  } catch (err) {
    console.error("Error during fetching data: ", err);
  }
});

const getUserPost = createAsyncThunk("get/userPost", async (userID) => {
  try {
    const docSnapshot = await getDoc(doc(db, userID, "posts"));
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

const getOtherUserData = async (userID, setState) => {
  const userData = {};
  try {
    const docSnapshot = await getDocs(collection(db, userID));
    docSnapshot.forEach((doc) => {
      userData[doc.id] = doc.data();
    });
    setState(userData);
  } catch (err) {
    console.error("Error during fetching data: ", err);
  }
  9;
};

const addComment = async (postID, commentText, commentName) => {
  const newID = short.generate();
  const newComment = `comments.${newID}`;
  try {
    const commentDoc = doc(db, "Posts", postID);
    await updateDoc(commentDoc, {
      [newComment]: {
        commentName,
        commentText,
        commentTime: serverTimestamp(),
      },
    });
  } catch (err) {}
};

const likePost = async (postID, userID) => {
  try {
    const commentDoc = doc(db, "Posts", postID);
    const userDoc = doc(db, userID, "likedPost");

    updateDoc(userDoc, {
      likedPost: arrayUnion(postID),
    });
    await updateDoc(commentDoc, {
      likes: increment(1),
    });
  } catch (err) {}
};

const dislikePost = async (postID, userID) => {
  try {
    const commentDoc = doc(db, "Posts", postID);
    const userDoc = doc(db, userID, "likedPost");

    updateDoc(userDoc, {
      likedPost: arrayRemove(postID),
    });
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
  } catch (err) {
    throw err.message;
  }
};

const unFollow = async (currentUserID, userToUnFollowID) => {
  try {
    const followingRef = doc(db, currentUserID, "follow");
    const followerRef = doc(db, userToUnFollowID, "follow");
    updateDoc(followingRef, {
      following: arrayRemove(userToUnFollowID),
    });
    updateDoc(followerRef, { followers: arrayRemove(currentUserID) });
  } catch (err) {
    throw err.message;
  }
};

const bookmarkPost = async (postID, userID) => {
  try {
    const bookmarkRef = doc(db, userID, "bookmarks");
    updateDoc(bookmarkRef, { bookmarks: arrayUnion(postID) });
  } catch (err) {}
};

const removeBookmark = async (postID, userID) => {
  try {
    const bookmarkRef = doc(db, userID, "bookmarks");
    updateDoc(bookmarkRef, { bookmarks: arrayRemove(postID) });
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
  bookmarkPost,
  removeBookmark,
  getOtherUserData,
  updateUserData,
};
