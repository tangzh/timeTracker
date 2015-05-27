if (Meteor.isClient) {
	var START_BTN_CLASS = 'btn-primary',
	    STOP_BTN_CLASS = 'btn-danger',
	    $projectInputField,
	    $addNoteBtn;
	    
	Session.setDefault("timerValue", "00 : 00 : 00");
  Session.setDefault("btnClass", START_BTN_CLASS);
  Session.setDefault("startedTimer", false);

	var timerFunc;

	Template.newTimer.rendered = function() {
		$projectInputField = $('.project-name-input-field'),
	  $addNoteBtn = $('.add-note-btn');
	};
  
  /*====================================== Helpers for templates =================================================*/
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

  /*====================================== Events for templates =================================================*/
  Template.newTimer.events({
    'click #record-btn' : function() {
      if (Session.get("startedTimer")) { // to stop the timer
      	stopTimer();      	    
      }else { // to start the timer 
        startTimer();             
      }   
    }
  });

  /*====================================== Helper functions =================================================*/

  function startTimer() {
  	var starttime = new Date();
    timerFunc = setInterval(function() {
      var currenttime = new Date(),
          timeLength = currenttime.getTime() - starttime.getTime();
      timeLength = timeLength / 1000 | 0;

      Session.set("timerValue", getTimeFormat(timeLength));
    }, 1000);
    Session.set('startedTimer', true);
    Session.set('btnClass', STOP_BTN_CLASS);
    $addNoteBtn.removeClass('disabled');
  }

  function stopTimer() {
  	var projectName = $projectInputField.val();

    if (projectName.length === 0) {
    	$projectInputField.closest('.form-group').addClass('has-error');
    }else {
    	$projectInputField.closest('.form-group').removeClass('has-error');
    	$projectInputField.val('');
    	$addNoteBtn.addClass('disabled');

    	Session.set('startedTimer', false);
    	Session.set('btnClass', START_BTN_CLASS);
      clearInterval(timerFunc);
    	Records.insert({
        project: projectName,
        createdAt: new Date(),
        timeLength: Session.get('timerValue')
      });	        
    }
  }

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

}



