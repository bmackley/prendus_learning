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
    const concepts = await FirebaseService.get(path);
    return concepts.val();
};
const deleteConcept = async (key) => {
    const path = conceptPath;
    let conceptDelete = await FirebaseService.deleteItem('concept', key);
};
const orderConcepts = async (conceptsArray) => {
    for(let item in conceptsArray){
      const path = conceptPath + '/' + conceptsArray[item].key;
      const data = {pos: conceptsArray[item].pos};
      console.log(path)
      //Need to change this to an update function
      await FirebaseService.set(path, data)
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
