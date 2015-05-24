if (Meteor.isClient) {
	
	Session.setDefault("timerValue", "00 : 00 : 00");
  Session.setDefault("btnClass", "start-btn");
  Session.setDefault("startedTimer", false);

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

      if (Session.get("startedTimer")) { // to stop the timer
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
      }else { // to start the timer
        // var started = 0;
        
        var starttime = new Date();
        timerFunc = setInterval(function() {
          var currenttime = new Date(),
              timeLength = currenttime.getTime() - starttime.getTime();
          timeLength = timeLength / 1000 | 0;

          Session.set("timerValue", getTimeFormat(timeLength));
        }, 1000);
        Session.set('startedTimer', true);
        Session.set('btnClass', 'stop-btn');
      }   
    }
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
  return number < 10 ? '0' + number : number;
}

