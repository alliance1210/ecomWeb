import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading,setLoading] = useState(true)
  const [cartItem,setCartItem] = useState([])
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function signin(email,password){
    return signInWithEmailAndPassword(auth,email,password);
  }
  function signout(){
    return auth.signOut();
  }
  function resetpassword(email){
    return sendPasswordResetEmail(auth, email)
  }
  function addToCart(item){
    const itemExists = cartItem.some((cartItem) => cartItem.id === item.id);
    if (itemExists) {
      alert("Item already added to cart.");
    } else {
      setCartItem((prevItems) => [...prevItems, item]);
      alert("Item added to cart.");
    }
  }
  function removeFromCart(item){
    setCartItem(prevItems=>prevItems.filter(i=> item.id!==i.id))
  }
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
        setLoading(false)
      setCurrentUser(user);
    });
    return unsub;
  }, [currentUser]);
  const value = {
    currentUser,
    signup,
    signin,
    signout,
    resetpassword,
    addToCart,
    cartItem,
    removeFromCart
  };
  return <AuthContext.Provider value={value}>
        {!loading&&children}
    </AuthContext.Provider>;
}
