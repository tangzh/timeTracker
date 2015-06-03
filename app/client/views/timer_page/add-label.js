if (Meteor.isClient) {
	var currentLabels, rendered;
	// Labels.remove({});

	// Template.chooseLabel.onCreated( function() {
	// 	Meteor.call('createDefaultLabels', function(err, result) {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 	});		
	// });

	Template.chooseLabel.helpers({
		labels: function() {
			currentLabels = Labels.find({}, {name: 1});
			console.log(currentLabels.fetch());
			return currentLabels;
		}

	});
}