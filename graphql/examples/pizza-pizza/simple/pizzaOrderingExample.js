const { buildSchema } = require('graphql');
const { aweInspiringOrderSystem } = require('../aweInspiringOrderingSystem');

const { partTypes, getPizzaPartOptions } = aweInspiringOrderSystem;
     
const schema = buildSchema(`
    type Query {        
        availableCrusts : [PizzaPart!]
        availableSauce : [PizzaPart!]
        availableToppings : [PizzaPart!]   
        specialtyPizzas : [Pizza!]
        checkOrder(orderId : ID) : Order
    }

    type PizzaPart {
        id : ID!
        name : String!
        price : Float
    }

    type Mutation {
        placeOrder(order : OrderInput) : Order
    }

    enum Status { ${aweInspiringOrderSystem.statuses} }

    type OrderStatus {
        order : Order
        status : Status!
    }

    input OrderInput {
        pizzas : [PizzaInput!]        
        price : Float!
    }

    type Order {
        id : ID!
        pizza : [Pizza!]
        status : Status!
        price : Float!
    }

    input PizzaInput {
        toppings : [ID!]
        extraCheese : Boolean
        crust : ID
        sauce : ID
        otherHalfToppings : [ID!]
        specialInstructions : String
    }

    type Pizza {
        name : String
        toppings : [PizzaPart]
        extraCheese : Boolean
        crust : PizzaPart!
        sauce : PizzaPart
        otherHalfToppings : [PizzaPart]
    }
`);

//Can we do this better?

const root = {
    availableSauce: () => {    
        return getPizzaPartOptions(partTypes.SAUCE);
    },
    availableToppings : () => {       
        return getPizzaPartOptions(partTypes.TOPPING);
    },
    availableCrusts : () => {
        return getPizzaPartOptions(partTypes.CRUST);
    }, 
    checkOrder : ({ orderId }) => {
        return aweInspiringOrderSystem
            .checkOrder(orderId)
            .then(res => res);
    },
    specialtyPizzas : () => {
        return [{
            name : 'Pepperonipaloooza',
            crust: { id: '1', name : 'Thin' }
        }];
    },
    //Mutations!
    placeOrder : ({ order }) => {
        return aweInspiringOrderSystem
            .placeOrder(order)
            .then(res => res);
    }
}

module.exports = {
    schema,
    root
};