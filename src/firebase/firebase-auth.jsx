import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";
import { createUser } from "./firestore-methods";

const loginUser = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const { user } = res;
  } catch {
    const errCode = err.code;
    const errorMessage = err.message;
    console.log(errCode, errorMessage);
  }
};

const signUp = async (firstName, lastName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    createUser(firstName, lastName, email, res.user.uid);
  } catch {
    const errCode = err.code;
    const errorMessage = err.message;
    console.log(errCode, errorMessage);
  }
};

export { loginUser, signUp };
