import React, { createContext, useState, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { Route, Redirect } from "react-router-dom";
import { firebaseConfig } from "./firebaseConfig";
firebase.initializeApp(firebaseConfig);
export const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};
export function PrivateRoute({ children, ...rest }) {
  const isLogin = localStorage.getItem("user");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
const Auth = () => {
  const [user, setUser] = useState(null);
  const signIn = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("success");
        return 1;
      })
      .catch(function (error) {
        console.log(error.message);
        return 2;
      });
  };
  const signUp = (name, email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // console.log(res);
        let user = firebase.auth().currentUser;
        user
          .updateProfile({
            displayName: name,
          })
          .then(function () {
            // Update successful.
            console.log("update successfully");
            alert("success");
            const { displayName } = res.user;
            const updateUser = {
              isSignIn: true,
              name: displayName,
            };
            setUser(updateUser);
          })
          .catch(function (error) {
            alert(error.message);
          });
        return 1;
      })
      .catch(function (error) {
        console.log(error.message);
        return error.message;
      });
  };
  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
        return true;
      })
      .catch(function (error) {
        // An error happened.
        console.log(error.message);
        return false;
      });
  };

  useEffect(() => {
    //console.log("ami number one");
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
        const { displayName } = usr;
        const updateUser = {
          isSignIn: true,
          email: usr.email,
        };
        setUser(updateUser);
        //console.log("yesssssssssss");
      } else {
        // No user is signed in.
        //console.log("no user is signed in")
      }
    });
  }, []);
  return {
    user,
    signIn,
    signUp,
    signOut,
  };
};

export default Auth;
