const { Text, Relationship, DateTime, Select, CalendarDay } = require('@keystonejs/fields');
const { Markdown } = require('@keystonejs/fields-markdown');
/*
const { CloudinaryAdapter } = require('@keystonejs/file-adapters');
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image');

const fileAdapter = new CloudinaryAdapter({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'my-keystone-app',
});
*/

module.exports = {
  fields: {
    title: { type: Text },
    author: { type: Relationship, ref: 'User.posts', many: false },
    state: { type: Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: {  type: CalendarDay,
      dateFrom: '2019-01-01',
      dateTo: '2029-01-01',
      isRequired: false,
      defaultValue: new Date().toISOString('YYYY-MM-DD').substring(0, 10), // Today's date
      index: true, dependsOn: { state: 'published' } 
    },
    //  image: { type: CloudinaryImage },
    brief: { type: Text, height: 150 },
    extended: { type: Markdown, height: 400 },
    categories: { type: Relationship, ref: 'PostCategory', many: true },
  }
}