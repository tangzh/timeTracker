Records = new Mongo.Collection("records");

/** Schema
{
  _id: ,
  projectName: ,
  startTime: ,
  endTime: ,
  labels:[
    {
      _id: ,
      name: ,
      color: 
    }
  ]
}
*/

// methods

Meteor.methods({
  addRecord: function(record) {
    var project = Meteor.call('addProject', record.projectName); 
    // console.log('get project as', project);

    record.project = {
      projectId: project.projectId,
      projectName: record.projectName
    };

    record.userId = Meteor.userId();
    record = _.omit(record, 'projectName');

    var recordId;
    // console.log('would insert new record ', record);

    Records.insert(record, function(err, result) {
      recordId = result;
      Meteor.call('addRecordToUser', recordId);
      Meteor.call('addRecordToProject', project.projectId, recordId);
      Meteor.call('addRecordToLabels', record.labels, recordId);
    });  
  },

  deleteRecord: function(recordId) {
    Meteor.call('deleteRecordFromUser', recordId );  
    Meteor.call('deleteRecordFromProject', recordId );
    Meteor.call('deleteRecordFromLabels', recordId);
    Records.remove(recordId);  
  },

  updateRecordProject: function(recordId, newProjectName) {
    // should remove recordId from previous project
    Meteor.call('deleteRecordFromProject', recordId );
    
    // update the project attr in records
    var newProject = Meteor.call('addProject', newProjectName); 
    var project = {
          projectId: newProject.projectId,
          projectName: newProjectName
        };

    Records.update(recordId, {
      $set: {
        project: project
      }
    });  

    // and add the record to the new project
    Meteor.call('addRecordToProject', newProject.projectId, recordId);
  }
});
