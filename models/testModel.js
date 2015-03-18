testModel = new Mongo.Collection('testModel');

testModel.attachSchema(
    new SimpleSchema({
    title: {
      type: String
    },
    content: {
      type: String
    },
    createdAt: {
      type: Date,
      denyUpdate: false
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  testModel.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });
}
