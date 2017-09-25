const { buildSchema } = require('graphql');
const { aweInspiringOrderSystem } = require('./aweInspiringOrderingSystem');

// type Mutation {
//     placeOrder(order : Order) : Order
// }

const schema = buildSchema(`
    type Query {
        getPizzaPartOptions(partType : PartType) : PizzaPart
        getToppingsByCategory(category : ToppingCategory) : Topping
        specialtyPizzas : [Pizza!]
        checkOrder(orderId : ID) : Order
    }

    

    enum ToppingCategory { ${aweInspiringOrderSystem.toppingCategories} }

    enum Status { ${aweInspiringOrderSystem.statuses} }

    enum Size { ${aweInspiringOrderSystem.sizes} }

    enum PartType { ${Object.keys(aweInspiringOrderSystem.partTypes)} }

    type OrderStatus {
        order : Order
        status : Status!
    }

    type Order {
        id : ID!
        pizza : [Pizza!]
        cost : Float
        discounts : Float
        total : Float
    }

    type Pizza {
        name : String
        toppings : [Topping!]
        extraCheese : Boolean
        crust : Crust!
        sauce : Sauce
        size : Size
        otherHalfToppings : [Topping!]
    }

    type Sauce implements PizzaPart {
        id: ID!
        name : String!
        description : String
    }

    type Crust implements PizzaPart {
        id: ID!
        name : String!
        description : String
        additionalCost : Float
    }

    type Topping implements PizzaPart {
        id: ID!
        name : String!
        extra : Boolean
        description: String
        category : ToppingCategory
        price : Float
    }

    interface PizzaPart {
        id : ID!
        name : String!
        description : String        
    }
`);

const root = {
    getPizzaPartOptions : ({ partType }) => {
        return aweInspiringOrderSystem
            .getPizzaPartOptions(partType);
    },
    getToppingsByCategory : ({ category }) => {
        const { getPizzaPartOptions, partTypes } = aweInspiringOrderSystem;
        getPizzaPartOptions(partTypes.TOPPING)
            .then(res => { 
                let toppings = res && res.filter(topping => topping.category === category);
                console.info(toppings);
                return toppings;
            });
    },
    checkOrder : ({ orderId }) => {
        return aweInspiringOrderSystem
            .checkOrder(orderId)
            .then(res => res);
    },
    //Mutations!
    placeOrder : ({ order }) => {
        return aweInspiringOrderSystem
            .placeOrder(order)
            .then(res => res);
    }
};

module.exports = {
    schema,
    root
};