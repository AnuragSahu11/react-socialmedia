import { async } from "@firebase/util";
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
  deleteField,
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
      fullName: firstName + " " + lastName,
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
    const userArrRef = doc(db, "users", userID);
    const draftRef = doc(db, userID, "drafts");
    const notificationRef = doc(db, userID, "notifications");

    batch.set(postRef, { posts: [] });
    batch.set(followRef, { following: [], followers: [] });
    batch.set(likedPostRef, { likedPost: [] });
    batch.set(bookmarkRef, { bookmarks: [] });
    batch.set(userArrRef, {
      fullName: firstName + " " + lastName,
      dp: "",
      handle: "",
    });
    batch.set(notificationRef, { notifications: [] });
    batch.set(draftRef, {});

    await batch.commit();
  } catch (err) {
    throw err.message;
  }
};

const updateUserData = async (userID, userData) => {
  try {
    const userDocRef = doc(db, userID, "userData");
    const userArrRef = doc(db, "users", userID);
    await updateDoc(userDocRef, userData);
    updateDoc(userArrRef, {
      dp: userData.dp,
      handle: userData.handle,
    });
  } catch (err) {}
};

const getUserList = createAsyncThunk("get/userList", async () => {
  const userList = {};
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      userList[doc.id] = doc.data();
    });
    return userList;
  } catch (err) {
    console.error("Error during fetching data: ", err);
  }
});

const newPost = async (postCaption, postContent, userID, postImg) => {
  try {
    const docRef = await addDoc(collection(db, "Posts"), {
      caption: postCaption,
      content: postContent,
      img: postImg,
      time: serverTimestamp(),
      comments: [],
      likes: 0,
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

const updatePost = async (postID,{ caption, content, img } ) => {
  try {
    const postRef = doc(db, "Posts", postID);
    await updateDoc(postRef, {
      caption,
      content,
      img,
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

const addComment = async (postID, commentText, commenterID) => {
  const newID = short.generate();
  const newComment = `comments.${newID}`;
  try {
    const commentDoc = doc(db, "Posts", postID);
    await updateDoc(commentDoc, {
      [newComment]: {
        commenterID,
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
    const notificationRef = doc(db, userToFollowID, "notifications");
    updateDoc(followingRef, {
      following: arrayUnion(userToFollowID),
    });
    updateDoc(followerRef, { followers: arrayUnion(currentUserID) });
    updateDoc(notificationRef, {
      notifications: arrayUnion({ type: "follow", userID: currentUserID }),
    });
  } catch (err) {
    throw err.message;
  }
};

const unFollow = async (currentUserID, userToUnFollowID) => {
  try {
    const followingRef = doc(db, currentUserID, "follow");
    const followerRef = doc(db, userToUnFollowID, "follow");
    const notificationRef = doc(db, userToUnFollowID, "notifications");
    updateDoc(followingRef, {
      following: arrayRemove(userToUnFollowID),
    });
    updateDoc(followerRef, { followers: arrayRemove(currentUserID) });
    updateDoc(notificationRef, {
      notifications: arrayUnion({ type: "unfollow", userID: currentUserID }),
    });
  } catch (err) {
    throw err.message;
  }
};

const bookmarkPost = async (postID, userID) => {
  try {
    const bookmarkRef = doc(db, userID, "bookmarks");
    await updateDoc(bookmarkRef, { bookmarks: arrayUnion(postID) });
  } catch (err) {}
};

const removeBookmark = async (postID, userID) => {
  try {
    const bookmarkRef = doc(db, userID, "bookmarks");
    await updateDoc(bookmarkRef, { bookmarks: arrayRemove(postID) });
  } catch (err) {}
};

const addToDraft = async (userID, postData) => {
  const newID = short.generate();
  try {
    const draftRef = doc(db, userID, "drafts");
    await updateDoc(draftRef, { [newID]: { ...postData } });
  } catch (err) {}
};

const deleteFromDraft = async (userID, draftID) => {
  try {
    const draftRef = doc(db, userID, "drafts");
    await updateDoc(draftRef, {
      [draftID]: deleteField(),
    });
  } catch (err) {
    console.error(err);
  }
};

const clearNotifications = async (userID) => {
  const notificationRef = doc(db, userID, "notifications");
  updateDoc(notificationRef, { notifications: [] });
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
  getUserList,
  addToDraft,
  deleteFromDraft,
  clearNotifications,
};
