var myAdminHookFunction=function(){
	if ( !Meteor.user()) {
    // if the user is not logged in, render the Login template
    this.render('statuspage');
  } 
  	else if (Meteor.user().roles[0]=='admin'){
  		this.next();
  }

  // else  {
  //   // otherwise don't hold up the rest of hooks or our route/action function
  //   // from running
  //   this.next();
  // }
}

Router.onBeforeAction(myAdminHookFunction, {
  only: ['createIncident']
  // or except: ['routeOne', 'routeTwo']
});

Router.route('/admin', function () {
  this.render('adminPanel');
});

Router.route('/createIncident', function () {
  this.render('createIncident');
});



