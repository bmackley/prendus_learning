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
    execute: async (context, title) => {
        try {
          //Need to figure out what else to add here
          //get the user from the state to pass in here
          const user = 'bmackley@byu.edu';
          const conceptData = {
            title: title,
            user: user
          }
          // let success = await FirebaseService.push('concept', conceptData);
          const conceptSuccess = await ConceptModel.save(null, conceptData);
          context.action = {
              type: Actions.setConcepts.type,
              concept: conceptSuccess.title,
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
          const concepts = await ConceptModel.getConcepts();
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
    execute: async (context, key) => {
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
    execute: async (context, old_pos, new_pos) => {
        try {
          const deletedConcept = await ConceptModel.deleteConcept(key);
          console.log('deletedConcept');
          console.log(deletedConcept);
          context.action = {
              type: Actions.deleteConcept.type,
              concepts: deletedConcept,
          }
        }catch(error){
          return(error)
        }
    }
};

export const Actions = {
    setCurrentUser,
    checkUserAuth,
    setConcepts,
    getConcepts,
    deleteConcept,
};
