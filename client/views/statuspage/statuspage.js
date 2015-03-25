





Template.statuspage.rendered = function (){
// var eventarray=[]	
// incidentCalendar.find().forEach(function(obj){
//     eventarray.push({title: obj.title, start: obj.createdAt})
// })
	 	
		unresolvedArray=[]
		var item;
		var items = incidentCalendar.find();
		items.forEach(function(item) {
  		if (item.resolved==false ){
  			console.log('kitty!')
  			Session.set('newCurrentIncidents', true);
  			if(item.applies_to=="Management Console"){
  				Session.set('mgmt', "Outage");
  			}
  			unresolvedArray.push(item);
  			console.log(unresolvedArray)

  		}
  		Session.set("lifesizeUnresolved",unresolvedArray)
		});



	$('.context.example .ui.sidebar').sidebar({
	    context: $('.context.example .bottom.segment')
	  }).sidebar('attach events', '.context.example .menu .item');
	$('.accordion').accordion();
	$('.ui.modal.firstModal').modal('attach events', '.subscribe');
	$('.menu .item').tab();
	$('.ui.modal.calendarModal').modal('attach events', '.calClick ');

	// $('#calendar').fullCalendar({
	// 		defaultDate: '2015-02-12',
	// 		editable: false,
	// 		eventLimit: true, // allow "more" link when too many events
	// 		events: eventarray
	// 	});
	


	//Main status. This will return the overall health of Cloud
	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/status.json', function (data) {
	  Session.set('result', data.status.description);
	   if (Session.get('result')=="All Systems Operational"){
	   	$('#statusColor').addClass("codeGreen");
	   }
	   else if (Session.get('result')=="Partial System Outage"){
	   	$('#statusColor').addClass("codeRed");
	   }
	     else if (Session.get('result')=="Partially Degraded Service"){
	   	$('#statusColor').addClass("codeRed");
	   }
	});

	//API call for active incidents. This will return an array of incients. Perhaps the best way is to dynmically render and indicent if it's in progress.

	

	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/incidents/unresolved.json', function (data) {
	  Session.set('unresolved', data.incidents);
	  console.log('Current Incidents data return', Session.get('unresolved'));

	  if (Session.get('unresolved').length > 0){
	  	Session.set('currentIncidents', true);
	  	// $('#incidentTable').addClass("codeRed");

	  }
	  // else{
	  // 	$('#incidentTable').addClass("codeGreen");
	  // }

	});


	//API call for past incidents
	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/incidents.json', function (data) {
	  Session.set('incidentHistory', data.incidents);
	  console.log('incident history data return', Session.get('incidentHistory'));
	  //insert new incidents into mongo
	  for (i=0; i< Session.get('incidentHistory').length; i++){
	  	if (!incidentCalendar.findOne({ _id:Session.get('incidentHistory')[i].id  })){
	  		incidentCalendar.insert({ _id: Session.get('incidentHistory')[i].id, title : Session.get('incidentHistory')[i].name, content:Session.get('incidentHistory')[i].shortlink, createdAt: Session.get('incidentHistory')[i].updated_at});

	  	}
	  }
	  var incidentissues = Session.get('incidentHistory')
	  var uptimecounter =100
	  for(var i=0; i<incidentissues.length; i++){
	  	if (incidentissues[i].impact=='minor'){
	  		uptimecounter = uptimecounter-0.25;
	  		console.log(uptimecounter);
	  	}
	  	else if (incidentissues[i].impact=='major'){
	  		uptimecounter = uptimecounter-1.0;
	  	}
	  }
	  Session.set('upTime', uptimecounter)

	});

	//API call for subservices of Lifesize Cloud
	// $.get('https://7c66ps9x5g90.statuspage.io/api/v1/components.json', function (data) {
	//   Session.set('subServices', data.components);
	//   console.log('Subservices data return', Session.get('subServices'));

	// });
	if (Session.get('newCurrentIncidents')){
		// Session.set('mgmt', "Outage");

		//add applies_to rules here
	}
	else Session.set('mgmt', "Operational")


	//API call for Active Scheduled Maintenance 
	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/scheduled-maintenances/active.json', function (data) {
	  Session.set('activeMaint', data.scheduled_maintenances);
	  console.log('Current Active Maintenance data return', Session.get('activeMaint'));

	  if (Session.get('activeMaint').length > 0){
	  	Session.set('currentMaint', true);
	  }


	});

	//API call for completed Scheduled Maintenance

	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/scheduled-maintenances.json', function (data) {
	  Session.set('schedMaint', data.scheduled_maintenances);
	  console.log('Scheduled Maintenance data return', Session.get('schedMaint'));
	  for (i=0; i< Session.get('schedMaint').length; i++){
	  	if (!calendar.findOne({ _id:Session.get('schedMaint')[i].id  })){
	  		calendar.insert({ _id: Session.get('schedMaint')[i].id, title : Session.get('schedMaint')[i].name, content:Session.get('schedMaint')[i].shortlink, createdAt: Session.get('schedMaint')[i].updated_at});
	  	}
	  }

	});
	// Email Submission
	$('.emailCall').click(function(){
		var sp = new StatusPage.page({ page : '7c66ps9x5g90' });
		  sp.subscribe({
		    subscriber : {
		      email : $('.emailField').val()
		    },
		    success : function (response) {
		      console.log(response.email)
		      $('.ui.modal.secondModal').modal('show');

		    }
		  });

	});

	// SMS Submission
	$('.smsCall').click(function(){
		var sp = new StatusPage.page({ page : '7c66ps9x5g90' });
		  sp.subscribe({
		    subscriber : {
		      phone_number : $('.smsField').val(),
		      phone_country : 'us'
		    },
		    success : function (response) {
		      console.log(response.email);
		      $('.ui.modal.secondModal').modal('show');
		    }
		  });

	});

	// populated calendar
}



Template.statuspage.helpers({
	overallStatus : function(){return Session.get('result')},
	incidentTable: function(){return Session.get('currentIncidents')},
	newCurrentIncidents: function(){return Session.get('newCurrentIncidents')},
	maintTable: function(){return Session.get('currentMaint')},
	incidentHistoryTable: function(){return Session.get('incidentHistory')},
	subServicesTable: function(){return Session.get('subServices')},
	currentIncidentEvents: function(){return Session.get('unresolved')},
	customCurrentIncidentEvents: function(){return Session.get('lifesizeUnresolved')},
	currentMaintEvents: function(){return Session.get('activeMaint')},
	upTimeStatus: function(){return Session.get('upTime')},
	ScheduledMaintenanceEvents: function(){return Session.get('schedMaint')},
	mgmt: function  () { return Session.get('mgmt')
		// body...
	}

});

// 	$('#calendar').fullCalendar({
// // 			defaultDate: '2015-02-12',
// // 			editable: false,
// // 			eventLimit: true, // allow "more" link when too many events
// // 			events: eventarray
// // 		});	


Template.statuspage.events=({
	// $('.calClick').click(function () {
	// 	alert('holy shit!')
	// 	// body...
	// })
	'click .calClick': function(){
    	var eventarray=[]
    	var maintArray=[]	
    incidentCalendar.find().forEach(function(obj){
        eventarray.push({realid: obj._id, title: obj.title, start: obj.createdAt, content: obj.content})
    })
    calendar.find().forEach(function(obj){
        maintArray.push({title: obj.title, start: obj.createdAt, content: obj.content, color:"green"})
    })
    console.log(maintArray)
    eventarray=eventarray.concat(maintArray);
    	$('#calendar').fullCalendar({
    		eventClick: function(calEvent, jsEvent, view) {

        // alert('Hell yeah ' + calEvent.content);
        window.location.href="/incident/"+calEvent.realid;
        

        // change the border color just for fun
        // $(this).css('border-color', 'red');

    },
			defaultDate: new Date(),
			editable: false,
			eventLimit: true, // allow "more" link when too many events
			events: eventarray
		});	

}
});



