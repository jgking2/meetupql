const { graphql, buildSchema } = require('graphql');
const { predict } = require('./magicEightBall');

const schema = buildSchema(`
    type Query {
        magicEightBall(question : String!) : Prediction
        error : MixedResponse
    }

    type MixedResponse {
        badApple : BadResponse
        goodApple : BadResponse
    }

    type BadResponse {
        missing : String!
        exists : String 
    }

    type Prediction {
        value : String!
        certainty : Float
    }
`);

const root = {
    magicEightBall : (question) => predict(),
    error : () => ({
        badApple : {
            exists : 'Oh no...',
        },
        goodApple : {
            exists : 'Here I am!',
            missing : 'Not today!'
        }
        
    })
};

module.exports = {
    validationRoot : root,
    validationSchema : schema
};