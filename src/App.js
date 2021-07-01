import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import "./App.css";
import firebaseConfig from "./firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({});
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var gitHubProvider = new firebase.auth.GithubAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage, email);
      });
  };
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log("FB User", user);
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorMessage, errorCode);
      });
  };
  const handleGitHubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(gitHubProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log("Git", user);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage);
        // ...
      });
  };
  return (
    <div className="App">
      <h1>Hello Fire</h1>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
      <button onClick={handleFbSignIn}>Facebook Sign In</button>
      <br />
      <br />
      <button onClick={handleGitHubSignIn}>GitHub Sign In</button>
    </div>
  );
}

export default App;
