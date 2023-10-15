import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCdX8gQXkmFV0VrV5QQj5r0YqApBI-C5I4",
  authDomain: "bookify-354aa.firebaseapp.com",
  projectId: "bookify-354aa",
  storageBucket: "bookify-354aa.appspot.com",
  messagingSenderId: "196956041950",
  appId: "1:196956041950:web:60b7fdfafbfd9b6a77084f",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp); //wip
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const firestorage = getStorage();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const Logged = () => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    Logged();
  }, []);
  const signupUserWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  const LoginUser = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  const SignWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, googleProvider);
  };
  async function createNewListing(name, isbn, price, coverfile) {
    try {
      console.log(firestore);
      // Create a reference to the image in Firebase storage
      const imageRef = ref(
        firestorage,
        `upload/image/${Date.now()}-${coverfile.name}`
      );

      console.log(imageRef);
      // Upload the file to Firebase storage
      const uploadResult = await uploadBytes(imageRef, coverfile);

      console.log(uploadResult);
      // Get the full path of the uploaded file
      const imagePath = uploadResult.ref.fullPath;

      // Add the listing to the Firestore collection
      const listingDoc = await addDoc(collection(firestore, "bookify"), {
        name: name,
        isbn: isbn,
        price: price,
        coverfile: imagePath, // Save the file path in Firestore
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
      });

      console.log("Listing created successfully:", listingDoc.id);
      return listingDoc.id; // Return the ID of the created listing
    } catch (error) {
      console.error("Error creating listing:", error);
      throw new Error("Failed to create listing. Please try again.");
    }
  }
  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailPassword,
        LoginUser,
        SignWithGoogle,
        isLoggedIn,
        createNewListing,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
