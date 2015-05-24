if (Meteor.isClient) {
	// History
  Template.recordHistory.helpers({
    records: function() {
      return Records.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.record.events({
    'click .delete': function() {
      Records.remove(this._id);
    },
    'keypress input.projectName': function(event, template) {
      if (event.which === 13) {
        Records.update(this._id, {$set: {
          project: template.find('.projectName').value
        }});
        template.find('.projectName').blur();
      }
    }
  });
}
