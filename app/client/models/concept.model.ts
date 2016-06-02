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
        console.log(FirebaseService)
        return await FirebaseService.push(path, data);
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
    console.log(concepts);
    console.log(concepts.val());
    return concepts.val();
};
const deleteConcept = async (key) => {
    const path = conceptPath;
    let conceptDelete = await FirebaseService.deleteConcept('concepts', key);
    return conceptDelete;
};

export const ConceptModel = {
    save,
    getById,
    getConcepts,
    deleteConcept,
}
