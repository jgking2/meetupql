const { 
    personType, 
    superHeroType,
    mutantHeroType,
    characterInterface,    
} = require('./types');
const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');

const queryType = new GraphQLObjectType({
    name : 'Query',
    fields: {
        characters : {
            args: { 
                id : {
                    type : GraphQLString,
                    description : 'Optional identifier to search the users'
                }
            },
            type : new GraphQLList(characterInterface),        
            resolve : (_, { id }) => {
                console.info(id);
             
                return getCharactersById(id).then(res => {
                    console.info(res);
                    return res;
                });
            }
        },
        mutants : {
            type : new GraphQLList(mutantHeroType),
            resolve : (_) => getCharactersById()
        },
        superheros : {
            type : new GraphQLList(superHeroType),
            resolve : (_) => [heroes[1]]
        }
    }
});

module.exports = { queryType };

const heroes = [
    {  
        id : 1,
        name : 'Wolverine',
        origin : "XMEN",
        mutations : ["HEALING"]
    }, {
        id: 2,
        name : 'Spider Man',
        origin: 'SPIDERMAN',
        powers : ['WEBSLINGER'],
        identity : {
            id: 4,
            name : 'Peter Parker',
            occupation : 'Photographer'
        }
    }
];

const getCharactersById = (id) => {
    return new Promise((resolve, reject) => {
        return resolve(
            heroes
        );
    });
};