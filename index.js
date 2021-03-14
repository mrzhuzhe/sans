const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password, Relationship } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./initial-data');
const express = require('express');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'sans';
const adapterConfig = { mongoUri: 'mongodb://localhost/sans' };

const TodoSchema = require('./lists/Todo.js');
const PostsSchema = require('./lists/Posts.js');
const UsersSchema = require('./lists/Users.js');
const PostCategorySchema = require('./lists/PostCategory.js');

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
});



// customList s 

keystone.createList('Todo', TodoSchema);
keystone.createList('Post', PostsSchema);
keystone.createList('User', UsersSchema);
keystone.createList('PostCategory', PostCategorySchema);


class CustomApp {
  prepareMiddleware({ keystone, dev, distDir }) {
    const middleware = express();
    middleware.get('/api',  function (req, res) {
      res.send({"a": 1})
    });
    return middleware;
  }
}

// customList e

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: { protectIdentities: process.env.NODE_ENV === 'production' },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
    new CustomApp(),
  ],
};
