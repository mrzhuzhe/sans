const { Text, Relationship } = require('@keystonejs/fields');


module.exports = {
  fields: {
    name: { type: Text, required: true },
    categories: { type: Relationship, ref: 'Post', many: true },
  }
}