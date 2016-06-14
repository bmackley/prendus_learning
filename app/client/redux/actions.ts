import {FirebaseService} from '../services/firebase.service.ts'
import {ClassModel} from '../models/class.model.ts'
import {ConceptModel} from '../models/concept.model.ts'

const setCurrentUser = {
    type: 'SET_CURRENT_USER',
    execute: async (context, email, password) => {
        try {
          const success = await FirebaseService.logInUser(email, password);
          context.action = {
            type: Actions.setCurrentUser.type,
            email: success.email
          };
        }catch(error){
          //with errors try dispatching an action to handle the error
          return error;
        }
    }
};
const checkUserAuth = {
    type: 'CHECK_USER_AUTH',
    execute: async (context) => {
        try {
          const success = await FirebaseService.currentUser();
          context.action = {
            type: Actions.checkUserAuth.type,
            email: success
          };
        }catch(error){
          //with errors try dispatching an action to handle the error
          return error;
        }
    }
};
const setConcepts = {
    type: 'SET_CONCEPTS',
    execute: async (context, newConcept) => {
        try {
          const conceptSuccess = await ConceptModel.save(null, newConcept);
          context.action = newConcept;
        }catch(error){
          return(error)
        }
    }
};
const addConcept = {
    type: 'ADD_CONCEPT',
    execute: async (context, newConcept, conceptsArray) => {
        try {
          console.log('Add Concept WOrking')
          console.log('New Concept', newConcept)
          const conceptSuccess = await ConceptModel.save(null, newConcept);
          console.log('Concepts Success', conceptSuccess)
          conceptsArray.conceptSuccess = newConcept;
          console.log('Concepts Array', conceptsArray)
          context.action = {
              type: Actions.addConcept.type,
              key: conceptSuccess,
              pos: newConcept.pos,
              title: newConcept.title
          }
        }catch(error){
          return(error)
        }
    }
};
const getConcepts = {
    type: 'GET_CONCEPTS',
    execute: async (context) => {
        try {
          const modelConcepts = await ConceptModel.getConcepts();
          console.log(modelConcepts)
          const concepts = []
          console.log('concepts before ', modelConcepts)
          for(const key in modelConcepts){
              concepts.push(modelConcepts[key])
          }
          for(let i, len = modelConcepts.length; i < len; i++){
            modelConcepts[i]
          }
          console.log('concepts after', concepts)
          function compare(a,b){
            if(a.pos < b.pos)return -1;
            if(a.pos > b.pos)return 1;
            return 0;
          }
          concepts.sort(compare)
          // console.log('concepts', concepts)

          context.action = {
              type: Actions.getConcepts.type,
              concepts: concepts,
          }
        }catch(error){
          return(error)
        }
    }
};
const deleteConcept = {
    type: 'DELETE_CONCEPT',
    execute: async (context, key, conceptsArray) => {
        try {
          await ConceptModel.deleteConcept(key);
          context.action = {
              type: Actions.deleteConcept.type,
              conceptKey: key,
          }
        }catch(error){
          return(error)
        }
    }
};
const orderConcepts = {
    type: 'ORDER_CONCEPTS',
    execute: async (context, conceptsArray) => {
        //thre use cases: Reorder concepts, delete a concept
        await ConceptModel.orderConcepts(conceptsArray);
    }
};

export const Actions = {
    setCurrentUser,
    checkUserAuth,
    setConcepts,
    getConcepts,
    deleteConcept,
    orderConcepts,
    addConcept,
};
