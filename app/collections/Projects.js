Projects = new Mongo.Collection("projects");


// methods

Meteor.methods({
	addProject: function(record) {
		var projectName = record.projectName;

		if (Projects.find({ projectName: projectName}).count() === 0) {
			Projects.insert({
				projectName: projectName,
				allRecords: [{
					starttime: record.starttime,
					endtime: record.endtime,
					labels: record.labels
				}]
			});

			return {
				status: 'ok'
			};
		} else {
			var project = Projects.findOne({ projectName: projectName});
			project.allRecords.push({
				starttime: record.starttime,
				endtime: record.endtime,
				labels: record.labels
			});
			
			return {
				status: 'ok'
			};
		}
	}
});