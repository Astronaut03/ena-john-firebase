import * as firebase from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup} from "firebase/auth";import { signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";


export const initializeLoginFramework = () => {
    firebase.initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const googleProvider =  new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, googleProvider)
    .then((res) => {
      const { displayName, photoURL, email} = res.user;
      const signedInUser ={
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
      };
      return signedInUser; 
  })
    .catch((error) => {
      console.log(error.code); 
      console.log(error.message);
    })
  }

  export const handleFbSignIn =() =>{
    const fbProvider = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, fbProvider)
    .then((res) => {
      // The signed-in user info.
      const user = res.user;
      user.success = true;
      return user;
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const credential = FacebookAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;
  
      console.log('fb user after sign in', user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // The email of the user's account used.
      // const email = error.email;
      // The AuthCredential type that was used.
      // const credential = FacebookAuthProvider.credentialFromError(error);
  
      // ...
    });
  
  }

  export const handleSignOut = () =>{

    const auth = getAuth();
    return signOut(auth)
    .then((res) => {
    const signedOutUser ={
      isSignedIn: false,
      name:'',
      email:'',
      photo:'',
      error: '',
      success: false
    }
    return signedOutUser;
  })
  .catch((error) => {
    
  });
  }


  export const createUserWithEmailAndPasswords = (name, email, password) =>{
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // Signed in 
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
      })
      .catch((error) => {
        const newUserInfo ={};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
  }

  export const signInWithEmailAndPasswords = (email, password)=>{
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo ={};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserName = name =>{

    const auth = getAuth();
    
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      // Profile updated!
      console.log('user name update successfully');
    }).catch((error) => {
      // An error occurred
      console.log(error);
    });
  
  }


