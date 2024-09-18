// implement category and subcategory schema
// with all crud opreations

// list all categories with sub category count
// result should like
// Name	No Of Sub-Categories
// Category 1	10
// Category 2	5

const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schemas/index');
const resolvers = require('./resolvers/index');

const app = express();

mongoose.connect('mongodb://localhost:27017/categorydb')
    .then(() => console.log("Connected to MongoDb Successfully"))
    .catch(err => console.error(err));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
