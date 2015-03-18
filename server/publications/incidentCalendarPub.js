Meteor.publish('incidentCalendar', function () {
  return incidentCalendar.find();
});
