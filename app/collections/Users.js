// Users = new Mongo.Collection("users");

Meteor.methods({
  
  addRecordToUser: function(recordId) {
    var currentUser = Meteor.user();        
    currentUser.profile.records.push(recordId);

    Meteor.users.update(Meteor.userId(), {
      $set: {
        profile: currentUser.profile
      }
    });
  },

  deleteRecordFromUser: function(recordId) {
    var currentUser = Meteor.user(),
        index = currentUser.profile.records.indexOf(recordId);
    currentUser.profile.records.splice(index, 1);
    // debugger;

    Meteor.users.update(Meteor.userId(), {
      $set: {
        profile: currentUser.profile
      }
    });
  }
  // addRecord: function(record) {
  //  if (! Meteor.userId()) {
  //     throw new Meteor.Error("not-authorized");
  //   }

  //   var currentUser = Meteor.user();
  //   // debugger;

  //   if ( !currentUser.profile.records ) {
  //    currentUser.profile.records = [];
  //   }

  //   record.record_id = new Meteor.Collection.ObjectID();

  //   var project = Meteor.call('addProject', record);

  //   record.project = {
  //    projectId: project.data,
  //    projectName: record.projectName
  //   };

  //   record = _.omit(record, 'projectName');
  //   currentUser.profile.records.push(record);
  //   // console.log(currentUser.profile.records);
  //   // debugger;

  //   Meteor.users.update(Meteor.userId(), {
  //    $set: {
  //      profile: currentUser.profile
  //    }
  //   });


  //       // labels = Meteor.call('addLabel', record);
  //   // handle  project


  //   // handle labels
  // },
  // deleteRecord: function(recordId) {
  //  Meteor.user().profile.records
  //   Records.remove(recordId);
  // }
});