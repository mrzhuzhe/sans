var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'punisher';
	locals.filters = {
		//	post: req.params.post,
	};
	locals.data = {
		posts: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Punisher').model.find()/*One(/*{
			state: 'published',
			slug: locals.filters.post,
		}).populate('author categories'); */

		q.exec(function (err, result) {
			locals.data.posts = result;
			next(err);
		});

	});

	// Render the view
	view.render('punisher');
};
