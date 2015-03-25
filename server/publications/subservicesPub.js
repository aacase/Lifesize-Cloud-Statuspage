Meteor.publish('subservices', function () {
  return subservices.find();
});
