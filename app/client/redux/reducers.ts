import {InitialState} from './initial-state.ts';
import {Actions} from './actions.ts';

export function rootReducer(state = InitialState, action) {
    state.newConcept = ''; //Does this set it to null every time?
    state.deletedConcept = '';
    switch(action.type) {
        case Actions.setCurrentUser.type: {
          console.log('Hello World')
          const newState = Object.assign({}, state);
          newState.currentUser.email = action.email;
          return newState;
        }
        case Actions.checkUserAuth.type: {
          console.log('ech user auth')
          const newState = Object.assign({}, state);
          newState.currentUser.email = action.email;
          return newState;
        }
        case Actions.addConcept.type: {
          const newState = Object.assign({}, state);
          const conceptDetail = action.key;
          newState.concepts[action.key] = action;
          newState.newConcept = newState.concepts[action.key];
          return newState;
        }
        case Actions.setConcepts.type: {
            const newState = Object.assign({}, state);
            newState.concepts = {
                // uid: action.uid,
                title: action.title,
                // pos: action.pos,
                // creator: action.creator
            };
            return newState;
        }
        case Actions.deleteConcept.type: {
            const newState = Object.assign({}, state);
            const deletedConcept = action.conceptKey;
            for(const item in newState.concepts){
                if(item === deletedConcept){
                  delete newState.concepts[item];
                }
            }
            newState.deletedConcept = action.conceptKey;
            return newState;
        }
        case Actions.getConcepts.type: {
            const newState = Object.assign({}, state);
            newState.concepts = action.concepts;
            return newState;
        }
        default: {
            return state;
        }
    }
}
