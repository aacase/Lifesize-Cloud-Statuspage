


Template.statuspage.rendered = function (){

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


	  
	   // if (Session.get('unresolved')=="All Systems Operational"){
	   // 	$('#statusColor').addClass("codeGreen");
	   // }
	   // else if (Session.get('unresolved')=="Partial System Outage")
	   // 	$('#statusColor').addClass("codeRed");
	});

	




	
}



Template.statuspage.helpers({
	status : function(){return Session.get('result')},
	incidentTable: function(){return Session.get('currentIncidents')}


	// currentIncident: Session.get('currentIncidents')


	// currentIncident: function(){
	// 	if (Session.get('unresolved').length > 0){
	// 		return "true"
	// 	}
	// 	else{
	// 		return "false"
	// 	}
	// }

});



