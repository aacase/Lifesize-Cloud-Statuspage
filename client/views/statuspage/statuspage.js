


Template.statuspage.rendered = function (){

	$('.accordion').accordion();
	$('.subscribe .button').popup();

	//Main status. This will return the overall health of Cloud
	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/status.json', function (data) {
	  Session.set('result', data.status.description);
	   if (Session.get('result')=="All Systems Operational"){
	   	$('#statusColor').addClass("codeGreen");
	   }
	   else if (Session.get('result')=="Partial System Outage")
	   	$('#statusColor').addClass("codeRed");
	});

	//incidents. This will return an array of incients. Perhaps the best way is to dynmically render and indicent if it's in progress.

	

	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/incidents/unresolved.json', function (data) {
	  Session.set('unresolved', data.incidents);
	  console.log('unresolved data return', Session.get('unresolved'));

	  if (Session.get('unresolved').length > 0){
	  	Session.set('currentIncidents', true);
	  	$('#incidentTable').addClass("codeRed");

	  }
	  // else{
	  // 	$('#incidentTable').addClass("codeGreen");
	  // }

	});
	//API call for past incidents
	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/incidents.json', function (data) {
	  Session.set('incidentHistory', data.incidents);
	  console.log('incident history data return', Session.get('incidentHistory'));

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
	
}



Template.statuspage.helpers({
	overallStatus : function(){return Session.get('result')},
	incidentTable: function(){return Session.get('currentIncidents')},
	incidentHistoryTable: function(){return Session.get('incidentHistory')},
	subServicesTable: function(){return Session.get('subServices')},
	currentIncidentEvents: function(){return Session.get('unresolved')},
	upTimeStatus: function(){return Session.get('upTime')}

});











