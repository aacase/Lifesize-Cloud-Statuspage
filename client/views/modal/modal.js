if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("incidentCalendar");
}


Template.modal.helpers({
	updateDoc:function(){
		return Session.get("updateDoc")
	},
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
	incidentCalendar:function(){incidentCalendar.find()},
	incidentsCounter:function(){return Session.get('counter')}
});

Template['modal'].events({

});

Template.quickForm.events=({
	"click .button": function(event){
		itemsArray=[]
		var items = incidentCalendar.find();
			items.forEach(function(item) {
	  		if (item.resolved==false ){
	  			console.log('kitty!')
	  			Session.set('newCurrentIncidents', true);
	  			itemsArray.push(item);
	  			console.log(unresolvedArray)
	  			Session.set('lifesizeUnresolved',itemsArray)
	  			


	  		}

	});
		Router.go('/admin')
		}

});

