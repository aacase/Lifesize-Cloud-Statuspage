// Home Route
Router.route('/', {
  name: 'home',
  action: function () {
    this.render('home');
    SEO.set({ title: 'Home - ' + Meteor.App.NAME });
  }
});

Router.route('/statuspage', {
  name: 'statuspage',
  action: function () {
    this.render('statuspage');
    SEO.set({ title: 'Status Page ' + Meteor.App.NAME });
  }
});