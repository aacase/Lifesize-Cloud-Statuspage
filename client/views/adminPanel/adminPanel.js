Template['adminPanel'].helpers({

});

Template['adminPanel'].events({
	'click .log-out.button': function(){
    	
	alert("this is doing what it should.");
	Meteor.logout();

}
});


Template.adminPanel.rendered = function (){
	console.log('happy monday');
};