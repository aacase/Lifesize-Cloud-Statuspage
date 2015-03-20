


function loadUser(user) {
  var userAlreadyExists = typeof Meteor.users.findOne({ username : user.username }) === 'object';

  if (!userAlreadyExists) {
    Accounts.createUser(user);
  }
}

Meteor.startup(function () {
  var users = YAML.eval(Assets.getText('users.yml'));

  for (key in users) if (users.hasOwnProperty(key)) {
    loadUser(users[key]);
  }
  Roles.addUsersToRoles("CEvvK6fcwG9qSWvNr", ['admin'])
});

// Accounts.validateNewUser(function (user) {
//    var loggedInUser = Meteor.user();

//    if (Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
//      return true;
//    }

//    throw new Meteor.Error(403, "Not authorized to create new users");
//  });