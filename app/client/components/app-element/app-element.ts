import {rootReducer} from '../../redux/reducers.ts';
import {Actions} from '../../redux/actions.ts';

Polymer({
  is: 'app-element',
  properties: {
    },
  ready: function(e){
    this.rootReducer = rootReducer;
    Actions.checkUserAuth.execute(this);
  }
});
