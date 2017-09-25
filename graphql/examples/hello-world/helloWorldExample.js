//There are several libraries for graphQL, for a number of languages. 
//Examples from this presentation are from https://github.com/graphql/graphql-js.

const { graphql, buildSchema } = require('graphql');

//Defining a hello world
const schema = buildSchema(`
    type Query {
        hello: String
        parrot (input : String) : String
    }
`);

//Associated service would look something like this.
const root = {
    hello : () => 'World!!',
    parrot : ({input}) => input
};

module.exports = {
    schema,
    root
};