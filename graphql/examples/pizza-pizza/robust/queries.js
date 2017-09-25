const { 
    GraphQLObjectType, 
    GraphQLList,
    GraphQLID
} = require('graphql');
const { 
    pizzaPartTypeEnum,
    toppingCategoryEnum
} = require('./enums');
const { 
    pizzaPartInterface, 
    orderType,
    toppingType,
    pizzaType
} = require('./types');
const { 
    aweInspiringOrderSystem : {
        getPizzaPartOptions : loadPizzaPartOptions,
        specialtyPizzas : loadSpecialtyPizzas,
        checkOrder : loadOrder,
        partTypes
    } 
} = require('../aweInspiringOrderingSystem');

//Field declarations.
const getPizzaPartOptions = {
    resolve : (_, { partType }) => {
        return loadPizzaPartOptions(partType);
    },
    type : new GraphQLList(pizzaPartInterface),
    args : {
        partType : {
            type: pizzaPartTypeEnum,
            description: "What component of the pizza should the options return for"
        }
    }
};

const specialtyPizzas = {
    resolve : ( _ ) => loadSpecialtyPizzas(),
    type : new GraphQLList(pizzaType)
};

//Map arguments to 
const getToppingsByCategory = { 
    args : {
        category : { type : toppingCategoryEnum }
    },
    resolve : (_, { category }) => {
        return loadPizzaPartOptions(partTypes.TOPPING)
            .then(toppings => {
                return toppings.filter(topping => topping.category === category);
            });
    },
    type : new GraphQLList(toppingType)
};

const checkOrder = {
    args : {
        orderId : {
            type: GraphQLID
        }
    },
    resolve : (_, { orderId }) => {
        return loadOrder(orderId);
    },
    type : orderType
};


`type Query {
    getPizzaPartOptions(partType : PartType) : PizzaPart
    getToppingsByCategory(category : ToppingCategory) : Topping
    specialtyPizzas : [Pizza!]
    checkOrder(orderId : ID) : Order
}`

//Glue all the fields together into the top level query.
const query = new GraphQLObjectType({
    name : 'Query',
    description : 'Get information about the greatest pizza shop known to man.',
    fields: {
        checkOrder,
        getPizzaPartOptions,
        specialtyPizzas,
        getToppingsByCategory
    }
});

module.exports = {
    query
};
