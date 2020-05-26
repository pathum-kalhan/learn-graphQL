const express = require('express')

const app = express();

const graphqlHTTP = require('express-graphql')

const schema = require('./schema/schema')

const db = require('./config/db')
db.connect()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(5000, () => {
    console.log(`Server started on port`);
});