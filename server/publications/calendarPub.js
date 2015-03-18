Meteor.publish('calendar', function () {
  return calendar.find();
});
