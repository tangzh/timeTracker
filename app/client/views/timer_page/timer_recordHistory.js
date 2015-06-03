if (Meteor.isClient) {
	// History
  Template.recordHistory.helpers({
    records: function() {     
      return Records.find({}, {sort: {starttime: -1}});
    }   
  });

  // individual record
  Template.record.helpers({
    formatDate: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss')
    }
  });

  Template.record.events({
    'click .delete': function() {
      Records.remove(this._id);
    },
    'keypress input.projectName': function(event, template) {
      if (event.which === 13) {
        var newProjectName = template.find('.projectName').value;
        Records.update(this._id, {$set: {
          projectName: newProjectName
        }});

        var record = Records.find({id: this._id}),
            newRecord = _.pick(record, 'projectName', 'starttime', 'endtime', 'labels');
            
        Meteor.call('addProject', newRecord, function(err, result) {
          if (err) {
            console.log(er);
          }
        });
        template.find('.projectName').blur();
      }
    }
  });
}
