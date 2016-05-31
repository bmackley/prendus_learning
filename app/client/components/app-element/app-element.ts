import {rootReducer} from '../../redux/reducers.ts'

Polymer({
  is: "app-element",
  properties: {
    },
  ready: function(e){
    var initialState = {
        temp: 'initial temp'
    };
    this.rootReducer = rootReducer;
    
  }
});
