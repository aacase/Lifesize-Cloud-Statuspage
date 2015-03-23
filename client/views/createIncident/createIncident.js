Template['createIncident'].helpers({
});

Template.createIncident.events=({
	'click .blue.submit.button': function(){
		incidentCalendar.insert({ title : $('#incidentTitle').val(), content:$('#incidentDetails').val(), createdAt: Date.now(), resolved:false});
		Router.go('/');

}
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