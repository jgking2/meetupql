const { GraphQLObjectType } = require('graphql');
const { orderInput, orderType } = require('./types');
const { 
    aweInspiringOrderSystem : { 
        placeOrder 
    } 
} = require('../aweInspiringOrderingSystem');
// type Mutation {
//     placeOrder(order : OrderInput) : Order
// }

const mutation = new GraphQLObjectType({ 
    name: 'Mutation',
    description : "Order one or many doughy diviine-disks.",
    fields: {
        placeOrder : {
            args: {
                order : {
                    type : orderInput
                }
            },
            type: orderType,
            resolve : (_, { order }) =>  placeOrder(order)            
        }
    }
})

module.exports = {
    mutation
};