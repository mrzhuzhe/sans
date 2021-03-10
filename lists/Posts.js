const { Text, Relationship } = require('@keystonejs/fields');

module.exports = {
  fields: {
    title: { type: Text },
    author: { type: Relationship, ref: 'User.posts', many: false },
  }
}