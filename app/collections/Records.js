Records = new Mongo.Collection("records");


// methods

// Meteor.methods({
// 	addRecord: function(record) {
// 		var projectName = record.project;

// 		if (Records.find({ projectName: projectName}).count() === 0) {
// 			Records.insert({
// 				projectName: projectName,
// 				allRecords: [{
// 					starttime: record.starttime,
// 					endtime: record.endtime,
// 					timelength: record.timelength,
// 					labels: record.labels
// 				}]
// 			});

// 			return {
// 				status: 'ok'
// 			};
// 		} else {
// 			var record = Records.findOne({ projectName: projectName});
// 			record.allRecords.push({
// 				starttime: record.starttime,
// 				endtime: record.endtime,
// 				labels: record.labels
// 			});
// 			return {
// 				status: 'ok'
// 			};
// 		}
// 	}
// });