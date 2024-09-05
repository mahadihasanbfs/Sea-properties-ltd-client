import { createContext, useEffect, useState } from "react";
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setloading] = useState(true);

      const createUser = async (email, password) => {
            try {
                  setloading(true);
                  await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
                  let errorMessage = "An error occurred while creating the user.";
                  switch (error.code) {
                        case "auth/email-already-in-use":
                              errorMessage = "This email address is already in use. Please use a different email.";
                              break;
                        case "auth/weak-password":
                              errorMessage = "The password is too weak. Please choose a stronger password.";
                              break;
                        case "auth/invalid-email":
                              errorMessage = "Invalid email address. Please enter a valid email.";
                              break;
                        default:
                              errorMessage = "An unexpected error occurred. Please try again later.";
                  }
                  Swal.fire(errorMessage, '', "warning");
            } finally {
                  setloading(false);
            }
      }

      const signIn = async (email, password) => {
            try {
                  setloading(true);
                  await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                  let errorMessage = "An error occurred while signing in.";
                  switch (error.code) {
                        case "auth/user-not-found":
                        case "auth/wrong-password":
                              errorMessage = "Invalid email or password. Please check your credentials and try again.";
                              break;
                        case "auth/invalid-email":
                              errorMessage = "Invalid email address. Please enter a valid email.";
                              break;
                        default:
                              errorMessage = "An unexpected error occurred. Please try again later.";
                  }
                  Swal.fire(errorMessage, '', "error");
            } finally {
                  setloading(false);
            }
      }

      const updateUser = async (name, image = '') => {

            await updateProfile(auth.currentUser, {
                  displayName: name,
                  photoURL: image
            });

            logOut()


      }



      const googleSignIn = async () => {
            try {
                  const result = await signInWithPopup(auth, googleProvider);
                  return result
            } catch (error) {
                  Swal.fire(error.message, '', "error");
            }
      }

      const facebookSignIn = async () => {
            try {
                  await signInWithPopup(auth, facebookProvider);
            } catch (error) {
                  Swal.fire(error.message, '', "error");
            }
      }

      const logOut = () => {
            localStorage.removeItem('role')
            return signOut(auth)
      }

      useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, loggeduser => {
                  setUser(loggeduser)
                  if (loggeduser) {
                        setloading(false);
                  }
                  else {
                        setloading(false)
                  }
            })
            return () => {
                  return unsubscribe();
            }
      }, [])

      const authInfo = {
            user,
            loading,
            setloading,
            createUser,
            updateUser,
            signIn,
            googleSignIn,
            facebookSignIn,
            logOut
      }

      return (
            <AuthContext.Provider value={authInfo}>
                  {children}
            </AuthContext.Provider>
      );
};

export default AuthProvider;
