// Home Route

// old Home route
// Router.route('/', {
//   name: 'home',
//   action: function () {
//     this.render('home');
//     SEO.set({ title: 'Home - ' + Meteor.App.NAME });
//   }
// });

Router.route('/', {
  name: 'statuspage',
  action: function () {
    this.render('statuspage');
    SEO.set({ title: 'Status Page ' + Meteor.App.NAME });
  }
});

Router.map(function() {
    this.route('oneIncident', { 
        path: '/incident/:_id',
        template: 'singleIncident', // <-- to be explicit
        data: function() {
            return incidentCalendar.findOne(this.params._id);
        }
    });
});