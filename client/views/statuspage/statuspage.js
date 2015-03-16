


Template.statuspage.rendered = function (){
	$.get('https://7c66ps9x5g90.statuspage.io/api/v1/status.json', function (data) {
	  Session.set('result', data.status.description);
	   if (Session.get('result')=="All Systems Operational"){
	   	$('#statusColor').addClass("codeGreen");
	   }
	   else if (Session.get('result')=="Partial System Outage")
	   	$('#statusColor').addClass("codeRed");
	});	
}



Template.statuspage.helpers({
	status : function(){return Session.get('result')}

})



