


Template.statuspage.rendered = function (){
	// calendar.insert({ _id: "Testid", title : "test calendar entry", content:"03-18-2015", createdAt: new Date()});

	$('.accordion').accordion();
	$('.ui.modal.firstModal').modal('attach events', '.subscribe');
	$('.menu .item').tab();
	


	//Main status. This will return the overall health of Cloud
	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/status.json', function (data) {
	  Session.set('result', data.status.description);
	   if (Session.get('result')=="All Systems Operational"){
	   	$('#statusColor').addClass("codeGreen");
	   }
	   else if (Session.get('result')=="Partial System Outage")
	   	$('#statusColor').addClass("codeRed");
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
	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/components.json', function (data) {
	  Session.set('subServices', data.components);
	  console.log('Subservices data return', Session.get('subServices'));

	});


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
	
}



Template.statuspage.helpers({
	overallStatus : function(){return Session.get('result')},
	incidentTable: function(){return Session.get('currentIncidents')},
	maintTable: function(){return Session.get('currentMaint')},
	incidentHistoryTable: function(){return Session.get('incidentHistory')},
	subServicesTable: function(){return Session.get('subServices')},
	currentIncidentEvents: function(){return Session.get('unresolved')},
	currentMaintEvents: function(){return Session.get('activeMaint')},
	upTimeStatus: function(){return Session.get('upTime')},
	ScheduledMaintenanceEvents: function(){return Session.get('schedMaint')}

});






