


Template.statuspage.rendered = function (){

	$('.accordion').accordion();

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
	  else{
	  	$('#incidentTable').addClass("codeGreen");
	  }

	});

	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/incidents.json', function (data) {
	  Session.set('incidentHistory', data.incidents);
	  console.log('incident history data return', Session.get('incidentHistory'));

	});
	
}



Template.statuspage.helpers({
	overallStatus : function(){return Session.get('result')},
	incidentTable: function(){return Session.get('currentIncidents')},
	incidentHistoryTable: function(){return Session.get('incidentHistory')}

});





