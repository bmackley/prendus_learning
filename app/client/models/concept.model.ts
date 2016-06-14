import {FirebaseService} from '../services/firebase.service.ts'
const Firebase = require('firebase');

const conceptPath = 'concept/';
const save = async (id, data) => {
    if (id) {
        const path = conceptPath + id;
        await FirebaseService.set(path, data);
        return id;
    }
    else {
        const path = conceptPath;
        //figure out what happens when an error is returned
        const newConcept =  await FirebaseService.push(path, data);
        return newConcept.key;
    }
};
const getById = async (id) => {
    const path = conceptPath + id;
    const concept = await FirebaseService.get(path);
    return concept;
};
const getConcepts = async () => {
    const path = conceptPath;
    const databaseConcepts = await FirebaseService.get(path);
    const firebaseConcepts = databaseConcepts.val()
    //order the concepts based on their position
    for (let key in firebaseConcepts){
      console.log(key)
      firebaseConcepts[key].key = key;
    }
    return firebaseConcepts;
};
const deleteConcept = async (key) => {
    const path = conceptPath;
    let conceptDelete = await FirebaseService.deleteItem('concept', key);
};
const orderConcepts = async (conceptsArray) => {
    for(let item in conceptsArray){
      const path = conceptPath + '/' + conceptsArray[item].key;
      const data = conceptsArray[item];
      // var newPostKey = firebase.database().ref().child('posts').push().key;
      //
      //   // Write the new post's data simultaneously in the posts list and the user's post list.
      //   var updates = {};
      //   updates['/posts/' + newPostKey] = postData;
      //   updates['/user-posts/' + uid + '/' + newPostKey] = postData;
      //
      //   return firebase.database().ref().update(updates);
      //Need to change this to an update function
      console.log('inside the model update')
      await FirebaseService.update(path, data)
    }
    //get the list of concepts
    // let orderConcepts = await FirebaseService.update('concepts', old_pos, new_pos);
    // return conceptPath;
};

export const ConceptModel = {
    save,
    getById,
    getConcepts,
    deleteConcept,
    orderConcepts
}
