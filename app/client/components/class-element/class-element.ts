import {Actions} from '../../redux/actions.ts';
import {FirebaseService} from '../../services/firebase.service.ts';

Polymer({
  is: "class-element",
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
        console.log(this.concepts);
      }
      if(this.concepts.length === e.detail.state.newConcept.pos){
        this.push('concepts', e.detail.state.newConcept)
      }

  },
  addConcept: function(e){
    addDialog.open();
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
      console.log(this.concepts.length)
      let newConcept = {
        title: this.$.conceptFormName.value,
        pos: this.concepts.length,
      }
      console.log('sending the action')
      Actions.addConcept.execute(this, newConcept, this.concepts);
    }
  },
  sortableEnded: function(e){
    console.log('These are the concepts', this.concepts);
    // if(typeof e.newIndex !== 'undefined'){
    //   console.log('e', e)
    //   console.log('new Index', e.newIndex)
    //   console.log('old Index', e.oldIndex)
    //   let length = this.concepts.length;
    //   let updateConceptPositionArray = [];
    //   for(let i = 0, len = this.concepts.length; i < len; i++ ){
    //     console.log('i', i)
    //     if(e.newIndex < e.oldIndex){
    //       console.log('new Index less than old index')
    //       if(this.concepts[i].pos == e.oldIndex){
    //         this.concepts[i].pos = e.newIndex;
    //         console.log(this.concepts[i])
    //         updateConceptPositionArray.push(this.concepts[i])
    //         console.log('update concepts array 1', updateConceptPositionArray)
    //       }else{
    //         if(this.concepts[i].pos >= e.newIndex){
    //           console.log('concept position', this.concepts[i].pos)
    //           console.log('concept position plus plu', this.concepts[i].pos++)
    //           this.concepts[i].pos = this.concepts[i].pos++;
    //           console.log('concept position updated', this.concepts[i].pos)
    //           updateConceptPositionArray.push(this.concepts[i])
    //           console.log('update concepts array 2', updateConceptPositionArray)
    //         }
    //       }
    //     }else{
    //       console.log('New Index more than Old index');
    //       if(this.concepts[i].pos == e.oldIndex){
    //         this.concepts[i].pos = e.newIndex;
    //         updateConceptPositionArray.push(this.concepts[i])
    //         console.log('update concepts array 3', updateConceptPositionArray)
    //       }else{
    //         if(this.concepts[i].pos >= e.oldIndex && this.concepts[i].pos <= e.newIndex){
    //           this.concepts[i].pos = this.concepts[i].pos --;
    //           updateConceptPositionArray.push(this.concepts[i])
    //           console.log('update concepts array 4', updateConceptPositionArray)
    //         }
    //       }
    //     }
    //   }
    //   console.log(updateConceptPositionArray)
    //   Actions.orderConcepts.execute(this, updateConceptPositionArray);
    // }
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
// import {Actions} from '../../redux/actions.ts';
  // import {FirebaseService} from '../../services/firebase.service.ts';
  //
  // Polymer({
  //   is: "class-element",
  //   listeners: {
  //
  //   },
  //   mapStateToThis: function(e) {
  //     console.log(e.detail)
  //     console.log('This is the concepts', this.concepts);
  //     const firebaseConcepts = e.detail.state.concepts;
  //       for (let item in firebaseConcepts){
  //         console.log(firebaseConcepts[item])
  //         // let newConceptDemo = {
  //         //   title: firebaseConcepts[key].title,
  //         //   Creator: firebaseConcepts[key].user,
  //         //   key: key,
  //         // }
  //         this.concepts.push(firebaseConcepts[item])
  //       }
  //     console.log(this.concepts);
  //     console.log(this.concepts[0].title);
  //     console.log(this.courses)
  //   },
  //   addConcept: function(e){
  //     addDialog.open();
  //   },
  //   deleteItem: function(e){
  //     console.log('delete')
  //     //get the position here (or id, whatever is easier) to delete it.
  //     console.log(e.target.id)
  //     Actions.deleteConcept.execute(this, e.target.id);
  //     console.log('this is the element')
  //     let conceptID = e.target.id
  //     console.log(conceptID);
  //   },
  //   toggle: function(e) {
  //     let collapseTarget = (e.target.id);
  //     this.querySelector('#Concept' + collapseTarget).toggle();
  //   },
  //   sortableEnded: function(e){
  //     if(e.newIndex){
  //       console.log(e.newIndex);
  //       console.log(e.oldIndex);
  //       Actions.orderConcepts.execute(this, e.oldIndex, e.newIndex);
  //     }
  //   },
  //   addConceptFormDone: function(e){
  //     e.preventDefault();
  //     console.log('concepts list')
  //     console.log(this)
  //     if(this.$.conceptFormName.value){
  //       //close the dialog form if there has already been an input
  //       addDialog.close();
  //       //its an object because obviously its going to be alot more than just a title
  //       let newConceptDemo = {
  //         title: this.$.conceptFormName.value
  //       }
  //       this.push('concepts', newConceptDemo)
  //       newConceptDemo.title = this.$.conceptFormName.value;
  //       Actions.setConcepts.execute(this, this.$.conceptFormName.value);
  //     }
  //   },
  //   properties: {
  //       courses: {
  //         type: Array,
  //         value: [{title: 'Course Title', instructor: 'Instructor Name'}]
  //       },
  //       concepts: {
  //         type: Array,
  //         value: []
  //           // {title: 'Concept 1', pos: 1, Creator: 'Username 1', videos: {title: 'Concept1 Video'}}, {title: 'Concept 2', pos: 2, Creator: 'Username 2', videos: {title: 'Concept2 Video'}}, {title: 'Concept 3', pos: 3, Creator: 'Username 3', videos: {title: 'Concept3 Video'}}]
  //       }
  //     },
  //   ready: function(e){
  //     console.log('calling action')
  //     Actions.getConcepts.execute(this);
  //   }
  // });
