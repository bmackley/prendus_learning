import {Actions} from '../../redux/actions.ts';

Polymer({
  is: "sign-in",
  listeners: {
    'signin-submit.tap': 'loginTap'
  },
  loginTap: function(e){
    Actions.setCurrentUser.execute(this, this.$.loginEmail.value, this.$.loginPassword.value);
    let location = 'createclass'
    window.history.pushState({}, '', location);
    this.fire('location-changed', {}, {node: window});
  },
  properties: {

    },
  ready: function(e){

  }
});
