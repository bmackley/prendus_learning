  import {Actions} from '../../redux/actions.ts';
  import {FirebaseService} from '../../services/firebase.service.ts';

  Polymer({
    is: "class-element",
    listeners: {

    },
    mapStateToThis: function(e) {
      console.log(e.detail)
        let firebaseConcepts = e.detail.state.concepts.concepts;
        for (let key in firebaseConcepts){
          console.log(key)
          let newConceptDemo = {
            title: firebaseConcepts[key].title,
            Creator: firebaseConcepts[key].user,
            key: key,
          }
          this.push('concepts', newConceptDemo)
        }
      console.log(e)
    },
    addConcept: function(e){
      addDialog.open();
    },
    deleteItem: function(e){
      console.log('delete')
      //get the position here (or id, whatever is easier) to delete it.
      console.log(e.target.id)
      Actions.deleteConcept.execute(this, e.target.id);
      console.log('this is the element')
      let conceptID = e.target.id
      console.log(conceptID);
    },
    toggle: function(e) {
      let collapseTarget = (e.target.id);
      this.querySelector('#Concept' + collapseTarget).toggle();
    },
    sortableEnded: function(e){
      if(e.newIndex){
        console.log(e.newIndex);
        console.log(e.oldIndex);
        Actions.orderConcepts.execute(this, e.oldIndex, e.newIndex);
      }
    },
    addConceptFormDone: function(e){
      e.preventDefault();
      if(this.$.conceptFormName.value){
        //close the dialog form if there has already been an input
        addDialog.close();
        //its an object because obviously its going to be alot more than just a title
        let newConceptDemo = {
          title: this.$.conceptFormName.value
        }
        this.push('concepts', newConceptDemo)
        newConceptDemo.title = this.$.conceptFormName.value;
        Actions.setConcepts.execute(this, this.$.conceptFormName.value);
      }
    },
    properties: {
        title: {
          type: String,
          value: 'Course Name'
        },
        courses: {
          type: Array,
          value: [{title: 'Course Title', instructor: 'Instructor Name'}]
        },
        concepts: {
          type: Array,
          value: [{title: 'Concept 1', pos: 1, Creator: 'Username 1', videos: {title: 'Concept1 Video'}}, {title: 'Concept 2', pos: 2, Creator: 'Username 2', videos: {title: 'Concept2 Video'}}, {title: 'Concept 3', pos: 3, Creator: 'Username 3', videos: {title: 'Concept3 Video'}}]
        }
      },
    ready: function(e){
      var initialState = {
          temp: 'initial temp'
      };
      Actions.getConcepts.execute(this);
      this.rootReducer = function(state, action) {
          if (!state) {
            return initialState;
          }
          switch(action.type) {
              case 'CLASS_CONCEPTS': {
                var newState = Object.assign({}, state);
                newState.temp = action.newTemp;
                return newState;
              }
              case 'GET_CONCEPTS': {
                var newState = Object.assign({}, state);
                newState.temp = action.newTemp;
                return newState;
              }
              default: {
                return state;
              }
          };
      };
    }
  });
