import {InitialState} from './initial-state.ts';
import {Actions} from './actions.ts';

export function rootReducer(state = InitialState, action) {
    switch(action.type) {
        case Actions.setCurrentUser.type: {
            const newState = Object.assign({}, state);
            newState.currentUser.email = action.email;
            return newState;
        }
        case Actions.checkUserAuth.type: {
            const newState = Object.assign({}, state);
            newState.currentUser.email = action.user;
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
            console.log('in the reducer to delete the concept')
            //I want to be able to skip this step and just do it in Polymer but I don't know if that would be right
            //also, I'm not quite sure how to handle the state by only pushing the action that corresponds to this
            const newState = Object.assign({}, state);
            newState.deletedConcept = action.conceptKey;
            return newState;
        }
        case Actions.getConcepts.type: {
            const newState = Object.assign({}, state);
            // console.log('reducer concepts', action.concepts);
            newState.concepts = action.concepts;
            return newState;
        }
        default: {
            return state;
        }
    }
}
