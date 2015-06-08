if (Meteor.isClient) {
  Meteor.subscribe("userData");
  Meteor.subscribe("records");
  Meteor.subscribe("projects");

	// History
  Template.recordHistory.helpers({
    records: function() {   
      return Records.find( {userId: Meteor.user()._id }, {sort: {starttime: -1}});
    }
  });

  // individual record
  Template.record.helpers({
    formatDate: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss')
    },

    getTimeLength: function(starttime, endtime) {
      var timeDiff = moment(endtime).diff(moment(starttime)),
          timeDur = moment.duration(timeDiff)._data,
          timeLength = timeDur.hours + ' h ' + timeDur.minutes + ' m ' + timeDur.seconds + ' s';
      return timeLength;
    }
  });

  Template.record.events({
    'click .delete': function() {
      Meteor.call('deleteRecord', this._id);
    },
    'keypress input.projectName': function(event, template) {
      if (event.which === 13) {
        var newProjectName = template.find('.projectName').value;

        Meteor.call('updateRecordProject', this._id, newProjectName);

        // Records.update(this._id, {$set: {
        //   projectName: newProjectName
        // }});

        // var record = Records.find({id: this._id}),
        //     newRecord = _.pick(record, 'projectName', 'starttime', 'endtime', 'labels');
            
        // Meteor.call('addProject', newRecord, function(err, result) {
        //   if (err) {
        //     console.log(er);
        //   }
        // });
        template.find('.projectName').blur();
      }
    }
  });
}
