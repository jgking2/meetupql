const express = require('express');

const {
    schema : helloSchema, 
    root : helloRoot
} = require('./graphql/examples/hello-world/helloWorldExample');

const {
    validationRoot,
    validationSchema
} = require('./graphql/examples/validation/schema');

const { 
    ordering, 
    better 
} = require('./graphql/examples/pizza-pizza');

const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

const { 
    schema, 
    root : rootValue 
} = ordering;
const app = express();

/**
 * HELLO WORLD
 */

//Typical rest API.
app.get('/', (req, res) => {
    const response = helloRoot.hello();
    res.send(response);
}).get('/parrot/:input', (req, res) => {
    const response = req.params.input;
    res.send(response);
});


app.use('/helloql', graphqlHTTP({
    schema : helloSchema,
    rootValue: helloRoot,
    graphiql: true
}));


app.use('/eightball', graphqlHTTP({
    schema : validationSchema,
    rootValue : validationRoot,
    graphiql: true
}));

app.use('/simple', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}));



app.use('/graphql', graphqlHTTP({
    schema : better.schema,
    graphiql : true
}));

app.listen(8080, '0.0.0.0');