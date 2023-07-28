import { auth, onAuthStateChanged } from "./firebase.js";

export default function checkUserAuthentication() {
  return new Promise((resolve, reject) => {
    //use Promise to be able handle the authentication state asynchronously(wait for the result first)
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // Unsubscribe the listener to avoid memory leaks
        resolve(!!user); // Resolve the promise with a boolean indicating if the user is authenticated
      },
      reject
    );
  });
}
