Labels = new Mongo.Collection("labels");

// default values
var defaultLabels = [
  {
    color: '#d43f3a',
    labelName: 'Meal',
    records: []
  },
  {
    color: '#58d68d',
    labelName: 'Excercise',
    records: []
  },
  {
    color: '#3498db',
    labelName: 'Transportation',
    records: []
  }
];

Meteor.methods({
  createDefaultLabels: function() {
    if (Labels.find({}).count() < defaultLabels.length) {
      defaultLabels.forEach(function(label) {
        Labels.insert(label);
      });
    } // otherwise do nothing
    return {
      status: 'ok'
    };
  },

  addLabel: function(label) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var getLabel = Projects.findOne({ labelName: label.labelName});

    if (!getLabel) {
      _.extend(label, {
        records: []
      });

      var labelId = Labels.insert(label);

      return {
        status: 'ok',
        projectId: labelId
      };

    } else {
      return {
        status: 'ok',
        projectId: getLabel._id
      };
    }
  },

  addRecordToLabels: function(labels, recordId) {
    labels.forEach(function(label) {
      var currentRecords = label.records;
      currentRecords.push(recordId);

      Labels.update(label._id, {
        $set: {
          records: currentRecords
        }
      });
    });   
  },

  deleteRecordFromLabels: function(recordId) {
    var labels = Records.findOne(recordId).labels;

    labels.forEach(function(label) {
      var currentRecords = label.records,
          index = currentRecords.indexOf(recordId);
      currentRecords.splice(index, 1);

      Labels.update(label._id, {
        $set: {
          records: currentRecords
        }
      });

    });
  }
});