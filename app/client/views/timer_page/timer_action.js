if (Meteor.isClient) {
	var START_BTN_CLASS = 'btn-primary',
	    STOP_BTN_CLASS = 'btn-danger',
	    $projectInputField,
	    $addLabelBtn,
	    $addLabelModal;
	    
	Session.setDefault("timerValue", "00 : 00 : 00");
  Session.setDefault("btnClass", START_BTN_CLASS);
  Session.setDefault("startedTimer", false);

	var timerFunc, starttime;

	Template.newTimer.rendered = function() {
		$projectInputField = $('.project-name-input-field'),
	  $addLabelBtn = $('.add-label-btn');
	  $addLabelModal = $('#add-label-modal');
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
    },
    'click .add-label-btn' : function() {
    	$addLabelModal.modal('show');
    }
  });

  /*====================================== Helper functions =================================================*/

  function startTimer() {
  	starttime = new Date();
    timerFunc = setInterval(function() {
      var currenttime = new Date(),
          timeLength = currenttime.getTime() - starttime.getTime();
      timeLength = timeLength / 1000 | 0;

      Session.set("timerValue", getTimeFormat(timeLength));
    }, 1000);
    Session.set('startedTimer', true);
    Session.set('btnClass', STOP_BTN_CLASS);
    $addLabelBtn.removeClass('disabled');
  }

  function stopTimer() {
  	var projectName = $projectInputField.val();

    if (projectName.length === 0) {
    	$projectInputField.closest('.form-group').addClass('has-error');
    }else {
    	$projectInputField.closest('.form-group').removeClass('has-error');
    	$projectInputField.val('');
    	$addLabelBtn.addClass('disabled');

    	Session.set('startedTimer', false);
    	Session.set('btnClass', START_BTN_CLASS);
      clearInterval(timerFunc);
      console.log(Session.get("currentLabels"));

      var newRecord = {
      	projectName: projectName,
      	starttime: starttime,
      	endtime: new Date(),
      	labels: Session.get("currentLabels")
      };

      Meteor.call('addRecord', newRecord);
      // Meteor.call('addProject', newRecord, function(err, result) {
      // 	if (err) {
      // 		console.log(er);
      // 	}
      // });   		        
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



