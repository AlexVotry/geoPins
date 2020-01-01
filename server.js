const { ApolloServer } = require("apollo-server");
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { findOrCreateUser } = require('./controllers/userController')

mongoose
  .connect(process.env.MONGO_URI, 
    { useUnifiedTopology: true,
      useNewUrlParser: true
    },
  )
  .then(()=> console.log('db connected'))
  .catch(err => console.log(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
         currentUser = await findOrCreateUser(authToken)
      }
    } catch (err) {
      console.log(`unable to authenticate user with token ${authToken}`)
    }
    return {currentUser};
  }
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Listening on port ${url}`)
})