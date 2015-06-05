Projects = new Mongo.Collection("projects");

// methods

Meteor.methods({
	addProject: function(record) {
		if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

		var projectName = record.projectName,
		    projectId,
		    currentUserId =  Meteor.userId();

		if (Projects.find({ projectName: projectName}).count() === 0) {
			Projects.insert({
				projectName: projectName,
				users: [
					{
						currentUserId: [record.record_id]
					}				  
				]
			}, function(err, result) {
				projectId = result;
			});

			return {
				status: 'ok',
				data: projectId
			};
		} else {
			var project = Projects.findOne({ projectName: projectName});
			project.users.currentUserId.push(record.record_id);
			
			return {
				status: 'ok',
				data: project._id
			};
		}
	}
});