if (Meteor.isClient) {
  Meteor.subscribe("labels");

  Session.setDefault("currentLabels", []);

  var currentLabelIds = [];

  /*====================================== Helpers for templates =================================================*/
  Template.currentLabels.helpers({
    currentLabels: function() {
      return Session.get("currentLabels");
    }
  });

  Template.chooseLabel.helpers({
    labels: function() {
      return Labels.find({userId: this.userId});
    }
  });


  /*====================================== Events for templates =================================================*/
  Template.addLabelModal.events({
    'click .cancel-btn': function() {
      Session.set("currentLabels", []);
    },
    'click .close': function() {
      Session.set("currentLabels", []);
    }
  });

  Template.label.events({
    'click .choose-label': function() {
      console.log(this);
      var currentLabels = Session.get("currentLabels");
      if (currentLabelIds.indexOf(this._id) === -1) {
        currentLabels.push(this); 
        currentLabelIds.push(this._id); 
      }      
      
      Session.set("currentLabels", currentLabels);
    }
  });

  Template.currentLabel.events({
    'click .current-label': function() {
      var index = currentLabelIds.indexOf(this._id),
          currentLabels = Session.get("currentLabels");;

      currentLabels.splice(index, 1);
      currentLabelIds.splice(index, 1);

      Session.set("currentLabels", currentLabels);
    }
  });

  Template.addNewLabel.events({
    'click .add-new-label-btn': function() {
      var newLabelName = $('.new-label-name-field').val(),
          newLabelColor = $('.new-label-color-field').val(),
          newLabel = {
            labelName: newLabelName,
            color: newLabelColor
          };

      console.log(newLabelName, newLabelColor);
      Meteor.call('addLabel', newLabel);
    }
  });

}