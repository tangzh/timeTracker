if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Accounts.onCreateUser(function(options, user) {
	  // We're enforcing at least an empty profile object to avoid needing to check
	  // for its existence later.
	  user.profile = options.profile ? options.profile : {};
	  user.profile.records = [];
	  return user;
	});


  Meteor.publish('records', function() {
  	if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

  	return Records.find({});
  });

  Meteor.publish('userData', function() {
	  if(!this.userId) return null;
	  return Meteor.users.find(this.userId);
	});

	Meteor.publish('projects', function() {
  	if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

  	return Projects.find({});
  });

}
