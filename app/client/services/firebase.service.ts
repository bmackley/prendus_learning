const Firebase = require('firebase');
var config = {
  apiKey: "AIzaSyANTSoOA6LZZDxM7vqIlAl37B7IqWL-6MY",
  authDomain: "prendus.firebaseapp.com",
  databaseURL: "https://prendus.firebaseio.com",
  storageBucket: "prendus.appspot.com",
};
Firebase.initializeApp(config);
let rootRef = Firebase.database().ref();

const setConcept = async (creator, title ) => {
    const newConcept = await rootRef.set({
        title: title,
        creator: creator,
    });
    return newConcept;
};
const set = (path, data) => {
    const newConcept = rootRef.child(path).set(data)
    return newConcept;
};
const update = (path, data) => {
    const newConcept = rootRef.child(path).update(data)
    return newConcept;
};
const push = (path, data) => {
    const newConcept = rootRef.child(path).push(data)
    return newConcept;
};

const get = async (path) => {
    const concepts = await rootRef.child(path).once('value');
    return concepts;
};
const deleteItem = async (path, key) => {
    try{
      let newPath = path + "/" + key;
      rootRef.child(newPath).remove();
      //There use to be an onComplete parameter that was passed into remove, but can't find it in the new Firebase Docs
    }catch(error){return error;}
};
const createUser = async (email, password) => {
    const ref = new Firebase(`"https://prendus.firebaseio.com/"`);
    const userData = await ref.createUser({
        email,
        password
    });

    return userData;
};

const logInUser = async (email, password) => {
    const auth = await Firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    return auth;
};
const currentUser = => {
  console.log('firebase user')
  var user = window.firebase.User.currentUser;
  console.log(user)
  const userData = await Firebase.auth();
  // const userData = await Firebase.auth().onAuthStateChanged(function (user) {
  //   if (user) {
  //     // User is signed in.
  //     console.log(user.email)
  //     this.username = user;
  //     return;
  //   } else {
  //     // No user is signed in.
  //     return '';
  //   }
  // });
  console.log(userData.currentUser.email)
  console.log(userData.currentUser.email)
  return(userData)
};

const logOutUser = () => {
    const ref = new Firebase(`"https://prendus.firebaseio.com/"`);
    ref.unauth();
};



export const FirebaseService = {
    setConcept,
    set,
    update,
    push,
    get,
    deleteItem,
    createUser,
    logInUser,
    currentUser,
    logOutUser
};
