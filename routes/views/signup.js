// @file signup.js
// @path /routes/views/signup.js
// @description Handles the post request when the user tries to sign up.
// @url https://github.com/keystonejs/generator-keystone/issues/10
//
var keystone = require('keystone');
var User = keystone.list('User');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'signup';
	locals.filters = {
	};
	locals.data = {
	};

	locals.formData = req.body || {};

	view.on('post', { action: 'user.create' }, function(next) {

		// if (!keystone.security.csrf.validate(req)) {
		// 	req.flash('error', 'There was an error with your request, please try again.');
		// 	return renderView();
		// }

		if(locals.formData.password !== locals.formData.password_confirm){
      req.flash('error', 'The passwords do not match.');
			next();
		}

		var newUser = new User.model({
			name: {
				first: locals.formData.first,
				last: locals.formData.last
			},
			email: locals.formData.email,
			password: locals.formData.password
      //Add some user defaults here.
		});

		newUser.isAdmin = false;

		newUser.save(function(err, result) {
			if (err) {
				locals.data.validationErrors = err.errors;
			} else {
				req.flash('success', 'Account created. Please sign in.');

				//auto-signin can be easily implemented using the keystone.session.signin() API.
				return res.redirect('/keystone/signin');
			}
			next();
		});

	});

	// Render the view
	view.render('signup');
};