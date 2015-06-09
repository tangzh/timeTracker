Projects = new Mongo.Collection("projects");

// methods

Meteor.methods({
  addProject: function(newProjectName) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var currentUserId = Meteor.userId(),
        getProject = Projects.findOne({ projectName: newProjectName});
    // console.log('get projects id', getProject._id);
    // console.log('get all projects count', Projects.find({}).count());

    if (!getProject) {
      // debugger;
      var projectId = Projects.insert({
        projectName: newProjectName,
        records: []
      });
      // console.log('return project id', projectId);

      return {
        status: 'ok',
        projectId: projectId
      };

    } else {
      // debugger;
      return {
        status: 'ok',
        projectId: getProject._id
      };
    }
  },

  addRecordToProject: function(projectId, recordId) {
    var currentRecords = Projects.findOne(projectId).records;
    currentRecords.push(recordId);

    Projects.update(projectId, {
      $set: {
        records: currentRecords
      }
    });
  },

  deleteRecordFromProject: function(recordId) {
    console.log(Records.findOne(recordId));
    var projectId = Records.findOne(recordId).project.projectId,
        currentRecords = Projects.findOne(projectId).records,
        index = currentRecords.indexOf(recordId);
    currentRecords.splice(index, 1);
    // debugger;

    Projects.update(projectId, {
      $set: {records: currentRecords}
    });
  }

});
