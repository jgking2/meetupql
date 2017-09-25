const { 
    GraphQLInterfaceType, 
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLEnumType,
    GraphQLUnionType,
    GraphQLList
} = require('graphql');
const { 
    powersEnum, 
    mutantPowersEnum, 
    originEnum 
} = require('./enums'); 

//Character
const characterInterface = new GraphQLInterfaceType({
    name: 'Character',
    description : 'Properties shared between various types',
    fields: {
        id: { type : GraphQLID },
        name : { type : GraphQLString },
        origin : { type : originEnum }
    }
});

const personType = new GraphQLObjectType({
    name : 'Person',
    description : 'Regular person character',
    interfaces : [characterInterface],
    fields: { 
        id : {
            type : GraphQLID,
            resolve: (person) => person.id
        },
        name : { 
            type : GraphQLString,
            resolve: (person) => person.name 
        }, 
        origin : {
            type : originEnum,
            resolve : person => person.origin
        },
        occupation : {
            type : GraphQLString,
            resolve : person => person.occupation
        }
    },
    isTypeOf : (source) => !!source.occupation
});

//TODO - define resolves
const superHeroType = new GraphQLObjectType({
    name : 'SuperHero',
    description : 'Super heroes!!!',
    interfaces: [characterInterface],
    fields: {
        id: { 
            type : GraphQLID,
            resolve: hero => hero.id
        },
        name : { 
            type : GraphQLString,
            resolve : hero => hero.name
        },
        origin : { 
            type : originEnum,
            resolve : hero => hero.origin
        },
        powers : { 
            type : new GraphQLList(powersEnum),
            resolve : hero => hero.powers
        },
        identity : { 
            type : personType,
            resolve : hero => { 
                //TODO pull from service if missing.
                return hero.identity;
            }
        }
    },
    isTypeOf : (source) => !!source.powers
});

const mutantHeroType = new GraphQLObjectType({
    name : 'Mutant',
    description : 'Heroes with mutant powers',
    interfaces : [characterInterface],
    fields: {
        id : {
            type : GraphQLID,
            resolve : mutant => mutant.id
        },
        name : {
            type : GraphQLString,
            resolve : mutant => mutant.name
        },
        origin : {
            type : originEnum,
            resolve : () => 'XMEN'
        },
        originalName : {
            type : GraphQLString,
            resolve : mutant => mutant.originalName
        },
        mutations : {
            type: new GraphQLList(mutantPowersEnum),
            resolve : mutant => mutant.mutations
        }
    },
    isTypeOf : (source, context, info) => {
        //If mutations property exists.
        return !!source.mutations;
    }
});

module.exports = {
    characterInterface,
    personType,
    mutantHeroType,    
    superHeroType
};