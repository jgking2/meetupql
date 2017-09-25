const { GraphQLEnumType } = require('graphql');

const originEnum = new GraphQLEnumType({
    name : 'Origin',
    values : {
        XMEN : {  },
        BATMAN : {  },
        SPIDERMAN : {  },
        SUPERMAN : {  }
    }
});

const powersEnum = new GraphQLEnumType({
    name : 'Power',
    values: {
        STRENGTH :  {  },
        SPEED :  {  },
        VISION:  {  },
        RICHANDCRAFTY :  {  },
        WEBSLINGER : { }
    }
});

const mutantPowersEnum = new GraphQLEnumType({
    name : 'MutantPowersEnum',
    values : {
        HEALING :  {  },
        BLUEFUR :  {  },
        POWERSTEAL :  {  },
        SUPERMAGNET :  {  },
        MINDREADING :  {  },
        BONECLAWS :  {  }
    }
});

module.exports = {
    mutantPowersEnum,
    powersEnum,
    originEnum
};