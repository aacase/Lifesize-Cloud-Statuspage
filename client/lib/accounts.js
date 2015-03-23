AccountsTemplates.configure({
	forbidClientAccountCreation: true
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    redirect: '/createIncident'
});