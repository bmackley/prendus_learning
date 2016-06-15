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
          console.log('Check User Auth Actions')
          const success = await FirebaseService.currentUser();
          console.log(success)
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
          const conceptSuccess = await ConceptModel.save(null, newConcept);
          conceptsArray.conceptSuccess = newConcept;
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
          const concepts = []
          for(const key in modelConcepts){
              concepts.push(modelConcepts[key])
          }
          for(let i, len = modelConcepts.length; i < len; i++){
            modelConcepts[i]
          }
          function compare(a,b){
            if(a.pos < b.pos)return -1;
            if(a.pos > b.pos)return 1;
            return 0;
          }
          concepts.sort(compare)
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
