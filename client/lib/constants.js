// Define App Constants

//this is where all strings will go, similar to SKY's translate functionality. It's also where the API Call for our status lives.








if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'LifeSize Cloud Status',
  DESCRIPTION: 'Are we Up? Probably',
  UPTIMEMESSAGE:'During all recently reported incidents, Lifesize Cloud has maintained',
  PERFORMANCE: 'Performance',
  CLOUDSERVICES: 'Cloud Services',
  TABLENAME: 'Name',
  TABLESTATUS: 'Status'


};

