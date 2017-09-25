const { buildSchema, GraphQLSchema } = require('graphql');
const { queryType } = require('./query');

const schema = new GraphQLSchema({
    query : queryType
});

// console.info(schema);

module.exports = { schema };