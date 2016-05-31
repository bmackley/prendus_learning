import {FirebaseService} from '../services/firebase.service.ts'
import {ClassModel} from '../models/class.model.ts'
import {ConceptModel} from '../models/concept.model.ts'
export const Actions = {
    setCurrentUser: {
        type: 'SET_CURRENT_USER',
        execute: async (context, email, password) => {
            try {
              let success = await FirebaseService.logInUser(email, password);
              context.action = {
                type: Actions.setCurrentUser.type,
                email: success.email
              };
            }catch(error){
              return error;
            }
        }
    },
    setConcepts: {
        type: 'SET_CONCEPTS',
        execute: (context, title) => {
            try {
              let user = 'bmackley@byu.edu';
              let conceptData = {
                title: title,
                user: user
              }
              // let success = await FirebaseService.push('concept', conceptData);
              let conceptSuccess = ConceptModel.save(null, conceptData);
              context.action = {
                  type: Actions.setConcepts.type,
                  concept: conceptSuccess.title,
              }
            }catch(error){
              return(error)
            }
        }
    },
    getConcepts: {
        type: 'GET_CONCEPTS',
        execute: async (context) => {
            try {
              let concepts = await ConceptModel.getConcepts();
              context.action = {
                  type: Actions.getConcepts.type,
                  concepts: concepts,
              }
            }catch(error){
              return(error)
            }
        }
    },
};
