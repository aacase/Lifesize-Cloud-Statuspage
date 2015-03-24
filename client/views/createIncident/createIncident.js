if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("incidentCalendar");
}


Template.createIncident.rendered = function (){



		unresolvedArray=[]
		var item;
		var items = incidentCalendar.find();
		items.forEach(function(item) {
  		if (item.resolved==false ){
  			console.log('kitty!')
  			Session.set('newCurrentIncidents', true);
  			unresolvedArray.push(item);
  			console.log(unresolvedArray)
  			Session.set('counter', unresolvedArray.length)

  		}
  		Session.set("lifesizeUnresolved",unresolvedArray)
		});

};
Template.createIncident.helpers({
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
	incidentCalendar:function(){return incidentCalendar.find()},
	incidentsCounter:function(){return Session.get('lifesizeUnresolved').length}

});

Template.createIncident.events=({
// 	'click .ui.submit.button': function(){
		
// 		Router.go('/createIncident');

// }

"click .add-dog": function(){
    Session.set("updateDoc", null);
    $(".modal.insert").modal("show")},

  "click .edit-incident": function(){
    Session.set("updateDoc", this);
    $(".modal.update").modal("show")},

  "click .delete-incident": function(){
    incidentCalendar.remove(this._id);
			unresolvedArray=[]
			var item;
			var items = incidentCalendar.find();
			items.forEach(function(item) {
	  		if (item.resolved==false ){
	  			console.log('kitty!')
	  			Session.set('newCurrentIncidents', true);
	  			unresolvedArray.push(item);
	  			console.log(unresolvedArray)
	  			Session.set('counter', unresolvedArray.length)

	  		}
	  		Session.set("lifesizeUnresolved",unresolvedArray)
			});
	}

});
