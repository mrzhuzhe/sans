var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Punisher = new keystone.List('Punisher', {
	map: { name: 'title' }
});

/*"count": data.count,
            "title": data.title,
            "author": data.author,
            "date": data.updateTime,
            "url": data.href,
            "content": data.content */

Punisher.add({
	title: { type: String, required: true },
	author: { type: String },
	date: { type: Types.Date, index: true },
	url: { type: String },
	content: { type: String },
	count: { type: String },
});

//Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Punisher.register();
