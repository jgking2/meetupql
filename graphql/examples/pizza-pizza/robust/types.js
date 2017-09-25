const {
    GraphQLList,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInterfaceType,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLFloat
} = require('graphql');

const { 
    orderStatusEnum, 
    pizzaSizeEnum, 
    pizzaPartTypeEnum, 
    toppingCategoryEnum 
} = require('./enums');

const {
    Topping,
    Crust,
    Sauce
} = require('../data');

// interface PizzaPart {
//     id : ID!
//     name : String!
//     description : String        
// }
const pizzaPartInterface = new GraphQLInterfaceType({
    name : 'PizzaPart',
    description : 'Represents the shared fields between all pizza components',
    fields: {
        id: { type : new GraphQLNonNull(GraphQLID) },
        name: { type : new GraphQLNonNull(GraphQLString) },
        description : { type : GraphQLString }
    }
});

`
input ToppingInput {
    id : ID!
    extra : Boolean
}
`
const toppingInput = new GraphQLInputObjectType({
    name : 'ToppingInput',
    description : 'Pass topping information to create order!',
    fields : {
        id : { type : new GraphQLNonNull(GraphQLID) },
        extra : { type : GraphQLBoolean }
    }
});

// input PizzaInput {
//     toppings : [ToppingInput!]
//     extraCheese : Boolean
//     crust : ID
//     sauce : ID
//     otherHalfToppings : [ToppingInput!]
//     specialInstructions : String
// }
const pizzaInput = new GraphQLInputObjectType({
    name : 'PizzaInput',
    description: 'Format to order a pizza!',
    fields : {
        toppings : {
            type : new GraphQLList(new GraphQLNonNull(toppingInput))
        },
        extraCheese : { type : GraphQLBoolean },
        crust : { type : GraphQLID },
        sauce : { type : GraphQLID },
        otherHalfToppings : {
            type : new GraphQLList(new GraphQLNonNull(toppingInput))
        },
        size: { type : pizzaSizeEnum },
        specialInstructions : { type : GraphQLString }
    }
});


// type Sauce implements PizzaPart {
//     id: ID!
//     name : String!
//     description : String
// }
const sauceType = new GraphQLObjectType({
    name : 'Sauce',
    description : 'The pizza equivalent of blood - except it can live without it.',
    interfaces : [pizzaPartInterface],
    fields: {
        id : fieldHelper(new GraphQLNonNull(GraphQLID), "id"),
        name : fieldHelper(new GraphQLNonNull(GraphQLString), "name"),
        description: fieldHelper(GraphQLString, "description")
    },
    isTypeOf: (data, context, parent) => {
        return data instanceof Sauce;
    }
})

// type Crust implements PizzaPart {
//     id: ID!
//     name : String!
//     description : String
//     additionalCost : Float
// }
const crustType = new GraphQLObjectType({
    name : 'Crust',
    description : 'The doughy, edible, pizza-holding chalice',
    interfaces: [pizzaPartInterface],
    fields: {
        id: fieldHelper(new GraphQLNonNull(GraphQLID), 'id'),
        name: fieldHelper(new GraphQLNonNull(GraphQLString), 'name'),
        description: fieldHelper(GraphQLString, 'description'),
        additionalCost : fieldHelper(GraphQLFloat, 'additionalCost')
    },
    isTypeOf : (data, context, parent) => {
        return data instanceof Crust;
    }
});

// type Topping implements PizzaPart {
//     id: ID!
//     name : String!
//     extra : Boolean
//     description: String
//     category : ToppingCategory
//     price : Float
// }

const toppingType = new GraphQLObjectType({
    name : 'Topping',
    description : 'Pepperoni, and other stuff.',
    interfaces: [pizzaPartInterface],
    fields: {
        id: fieldHelper(new GraphQLNonNull(GraphQLID), 'id'),
        name : fieldHelper(new GraphQLNonNull(GraphQLString), 'name'),
        extra :  fieldHelper(GraphQLBoolean, 'extra'),
        description : fieldHelper(GraphQLString, 'description'),
        category : fieldHelper(toppingCategoryEnum, 'category'),
        price : fieldHelper(GraphQLFloat, 'price')
    },
    isTypeOf : (data, context, parent) => {
        return data instanceof Topping;
    }
});

// type Pizza {
//     name : String
//     toppings : [Topping!]
//     extraCheese : Boolean
//     crust : Crust!
//     sauce : Sauce
//     size : Size
//     otherHalfToppings : [Topping!]
// }
const pizzaType = new GraphQLObjectType({
    name : 'Pizza',
    description : 'Greatest food known to man, here is the makeup.',
    fields: {
        name : fieldHelper(GraphQLString, "name"),
        //Would actually most likely split these fields off for better separation, they're primarily used for specialty pizzas.
        description : fieldHelper(GraphQLString, "description"),
        price : fieldHelper(GraphQLString, "price"),
        imageUrl : fieldHelper(GraphQLString, "imageUrl"),
        toppings : fieldHelper(new GraphQLList(new GraphQLNonNull(toppingType)), "toppings"),
        extraCheese : fieldHelper(GraphQLBoolean, "extraCheese"),
        crust: fieldHelper(crustType, "crust"),
        sauce : fieldHelper(sauceType, "sauce"),
        size : fieldHelper(pizzaSizeEnum, "size"),
        otherHalfToppings : fieldHelper(new GraphQLList(new GraphQLNonNull(toppingType)), "otherHalfToppings")
    }
});

// input OrderInput {
//     pizzas : [PizzaInput!]        
//     price : Float!
// }
const orderInput = new GraphQLInputObjectType({
    name: 'OrderInput',
    description: 'Takes the pizza order!',
    fields: {
        pizzas : { type : new GraphQLList(
            new GraphQLNonNull(pizzaInput)) },
        price : { type : new GraphQLNonNull(GraphQLFloat) }
    }
});

// type Order {
//     id : ID!
//     pizzas : [Pizza!]
//     status : Status!
//     price : Float!
// }
const orderType = new GraphQLObjectType({
    name : 'Order',
    description : 'Order placed!',
    fields : {
        id : fieldHelper(new GraphQLNonNull(GraphQLID), "id"),
        pizzas : fieldHelper(new GraphQLList(
            new GraphQLNonNull(pizzaType)), "pizzas"),
        status : fieldHelper(orderStatusEnum, "status"),
        price : fieldHelper(GraphQLFloat, "price")
    }
});

module.exports = {
    //Inputs
    orderInput,
    pizzaInput,
    toppingInput,
    //Types
    crustType,
    sauceType,
    toppingType,
    pizzaType,
    orderType,
    //Interfaces
    pizzaPartInterface
};

/**
 * 
 * @param {Object} type GraphQL type
 * @param {string} property Property to extract
 * @returns {{type, resolve}}
 */
function fieldHelper(type, property) {
    return {
        type,
        resolve : (parent) => parent[property]
    }
}