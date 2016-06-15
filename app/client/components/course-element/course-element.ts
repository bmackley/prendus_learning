import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../services/firebase.service.ts';

Polymer({
  is: "course-element",
  listeners: {

  },
  // //mapStateToThis works with event changes.  If it changes somewhere else in the app, it will update here.
  mapStateToThis: function(e) {
      if(e.detail.state.deletedConcept){//works because if the deleted concept is not there, it won't fire in the if statement
        for(var i = 0; i < this.concepts.length; i++){
          if(this.concepts[i].key === e.detail.state.deletedConcept){
            this.splice('concepts', i, 1)
          }
        }
      }
      if(this.concepts.length === 0){
        this.concepts = e.detail.state.concepts;
      }
      if(this.concepts.length === e.detail.state.newConcept.pos){
        this.push('concepts', e.detail.state.newConcept)
      }

  },
  addConcept: function(e){
    addDialog.open();
  },
  DatePicker: function(e){
    selectDate.open();
  },
  dismissDatepicker: function(e){
    console.log(this.date)
    console.log('dismiss Datepicker', e)
    console.log(this.querySelector('paper-date-picker'))
  },
  deleteItem: function(e){
    const conceptsArray = this.concepts;
    Actions.deleteConcept.execute(this, e.target.id, conceptsArray);
  },
  toggle: function(e) {
    let collapseTarget = (e.target.id);
    this.querySelector('#Concept' + collapseTarget).toggle();
  },
  addConceptFormDone: function(e){
    e.preventDefault();
    if(this.$.conceptFormName.value){
      //close the dialog form if there has already been an input
      addDialog.close();
      let newConcept = {
        title: this.$.conceptFormName.value,
        pos: this.concepts.length,
      }
      Actions.addConcept.execute(this, newConcept, this.concepts);
    }
  },
  sortableEnded: function(e){
    if(typeof e.newIndex !== 'undefined'){
      let updateConceptPositionArray = [];
      for(let i = 0, len = this.concepts.length; i < len; i++ ){
        if(this.concepts[i].pos != i){
          this.concepts[i].pos = i
          updateConceptPositionArray.push(this.concepts[i])
        }
      }
      Actions.orderConcepts.execute(this, updateConceptPositionArray);
    }
  },
  properties: {
      title: {
        type: String,
        value: 'Course Name'
      },
      courses: {
        type: Array,
        value: [{title: 'Course Title', instructor: 'Instructor Name', startDate: Date.now(), endDate: Date.now()}]
      },
      concepts: {
        type: Array,
        value: []
        //value: [{title: 'Concept 1', pos: 1, Creator: 'Username 1', videos: {title: 'Concept1 Video'}}, {title: 'Concept 2', pos: 2, Creator: 'Username 2', videos: {title: 'Concept2 Video'}}, {title: 'Concept 3', pos: 3, Creator: 'Username 3', videos: {title: 'Concept3 Video'}}]
      }
    },
  ready: function(e){
    var initialState = {
        temp: 'initial temp'
    };
    Actions.getConcepts.execute(this);
  }
});
