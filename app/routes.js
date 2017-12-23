//All the routes should be specified here

var routes = {

	'/' 	: 'IndexController.home',
	'/new'  : 'IndexController.new',
	'/auth' : 'UserController.auth',

};

module.exports = routes;