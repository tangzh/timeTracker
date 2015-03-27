Records = new Mongo.Collection("records");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);
  Session.setDefault("timerValue", "00 : 00 : 00");
  Session.setDefault("btnClass", "start-btn");
  Session.setDefault("startedTimer", false);

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
      }
    }
  });

  var timerFunc;

  Template.timer.helpers({
    timerValue: function() {
      return Session.get("timerValue");
    }
  });

  Template.newTimer.helpers({
    btnClass: function() {
      return Session.get("btnClass");
    },
    startedTimer: function() {
      return Session.get("startedTimer");
    }
  });

  Template.newTimer.events({
    'submit .new-timer' : function(event) {
      event.preventDefault();

      if (Session.get("startedTimer")) {
        Session.set('startedTimer', false);
        Session.set('btnClass', 'start-btn');
        clearInterval(timerFunc);

        var projectName = event.target.text.value;
        Records.insert({
          project: projectName,
          createdAt: new Date(),
          timeLength: Session.get('timerValue')
        });
        event.target.text.value = "";
      }else {
        var started = 0;
        timerFunc = setInterval(function() {
          started += 1;
          Session.set("timerValue", getTimeFormat(started));
        }, 1000);
        Session.set('startedTimer', true);
        Session.set('btnClass', 'stop-btn');
      }   
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


// helper methods
function getTimeFormat(timeLength) {
  var hour = timeLength / 3600 | 0,
      hourLabel = getTimeStr(hour);
  timeLength -= hour*3600;

  var min = timeLength / 60 | 0,
      minLabel = getTimeStr(min);

  var second = timeLength - min*60,
      secondLabel = getTimeStr(second);

  var resultStr = hourLabel + ' : ' + minLabel + ' : ' + secondLabel;
  return resultStr;
}

function getTimeStr(number) {
  return number< 10 ? '0' + number : number;
}

