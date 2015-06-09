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
  },

  addProjectToUser: function(projectId) {
    var currentUserProjects = Meteor.user().profile.projects,
        index = currentUserProjects.indexOf(projectId);

    if (index === -1) {
      currentUserProjects.push(projectId);
      Meteor.users.update(Meteor.userId(), {
        $set: {
          profile: currentUser.profile
        }
      });
    }
  },

  addLabelToUser: function(labelId) {
    var currentUserLabels = Meteor.user().profile.labels,
        index = currentUserLabels.indexOf(labelId);

    if (index === -1) {
      currentUser.profile.labels.push(labelId);

      Meteor.users.update(Meteor.userId(), {
        $set: {
          profile: currentUser.profile
        }
      });
    }
  }
  
});