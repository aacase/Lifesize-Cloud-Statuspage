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
	ScheduledMaintenanceEvents: function(){return Session.get('schedMaint')}

});

Template.createIncident.events=({
// 	'click .ui.submit.button': function(){
		
// 		Router.go('/createIncident');

// }

"click .add-dog": function(){
    Session.set("updateDoc", null);
    $(".modal.insert").modal("show")}
  // "click .edit-dog": ->
  //   Session.set "updateDoc", @
  //   $(".modal.update").modal("show")
  // "click .delete-dog": ->
  //   Dogs.remove @_id

});



// $('.emailCall').click(function(){
// 		var sp = new StatusPage.page({ page : '7c66ps9x5g90' });
// 		  sp.subscribe({
// 		    subscriber : {
// 		      email : $('.emailField').val()
// 		    },
// 		    success : function (response) {
// 		      console.log(response.email)
// 		      $('.ui.modal.secondModal').modal('show');

// 		    }
// 		  });

// 	});