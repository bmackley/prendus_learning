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

const push = (path, data) => {
    const newConcept = rootRef.child(path).push(data)
    return newConcept;
};

const get = async (path) => {
    const concepts = await rootRef.child(path).once('value')
    return concepts;
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

const logOutUser = () => {
    const ref = new Firebase(`"https://prendus.firebaseio.com/"`);
    ref.unauth();
};



export const FirebaseService = {
    setConcept,
    set,
    push,
    get,
    createUser,
    logInUser,
    logOutUser
};
