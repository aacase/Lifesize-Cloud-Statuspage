Meteor.publish('testModel', function () {
  return testModel.find();
});
