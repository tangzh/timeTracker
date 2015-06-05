Labels = new Mongo.Collection("labels");

// default values
var defaultLabels = [
	{
		color: '#d43f3a',
		name: 'Meal',
		projects: []
	},
	{
		color: '#58d68d',
		name: 'Excercise',
		projects: []
	},
	{
		color: '#3498db',
		name: 'Transportation',
		projects: []
	},
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
	addLabel: function(record) {

	}
});