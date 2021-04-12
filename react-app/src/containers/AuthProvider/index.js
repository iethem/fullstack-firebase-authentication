/* eslint-disable react/prop-types */
/**
 *  AuthProvider
 *
 *  refer to: https://usehooks.com/useAuth/
 */

import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyA7h97EdEgth57ttiQcbUZngGdF2I__yLA',
  authDomain: 'ffapp-224f3.firebaseapp.com',
  projectId: 'ffapp-224f3',
  storageBucket: 'ffapp-224f3.appspot.com',
  messagingSenderId: '713971279104',
  appId: '1:713971279104:web:bdbb664381c30352e53fe5',
});

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signout = () =>
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signout,
  };
}
