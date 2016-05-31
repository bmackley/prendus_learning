import {InitialState} from './initial-state.ts';
import {Actions} from './actions.ts';

export function rootReducer(state = InitialState, action) {
    switch(action.type) {
        case Actions.setCurrentUser.type: {
            const newState = Object.assign({}, state);
            newState.currentUser.email = action.email;
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
        case Actions.getConcepts.type: {
            const newState = Object.assign({}, state);
            newState.concepts = action;
            return newState;
        }
        default: {
            return state;
        }
    }
}
