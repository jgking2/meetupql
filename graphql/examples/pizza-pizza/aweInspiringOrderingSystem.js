const { 
    partTypes, 
    toppingCategories, 
    toppings, 
    crusts,
    sauces,
    statuses
} = require('./data');

const orders = {};
//This s*** is amazing.
class AweInspiringOrderingSystem {
    constructor() {
        this.statuses = statuses;

        this.toppingCategories = Object.keys(toppingCategories);
    
        this.sizes = [
            'SMALL',
            'MEDIUM',
            'LARGE',
            'EXTRA_LARGE'
        ];
    
        this.partTypes = partTypes;
    }
    
    specialtyPizzas() {
        //TODO - move this to data.
        return new Promise((resolve, reject) => {
            resolve([{
                name : 'Pepperonipalooza',
                description: 'Pepperoni cooked in pepperoni, on top of another layer of pepperoni - finally finished with pepperoni, and a sprinkle of parmesan',
                crust: { id: '1', name : 'Thin' },
                price : 7.99,
                imageUrl : 'https://c2.staticflickr.com/4/3355/3275440764_5b516c9f37.jpg'
            }]);
        });
    }
    /**
     * 
     * @param {String} part 
     * @returns {Promise<[{ id, name }]>}
     */
    getPizzaPartOptions(part) {
        return new Promise((resolve, reject) => {
            var result;
            switch(part) {
                case partTypes.CRUST:
                    result = crusts;
                    break;
                case partTypes.SAUCE:
                    result = sauces;
                    break;
                case partTypes.TOPPING:
                    result = toppings;
                    break;
                default:
                    return reject('Invalid part');                
            }
            return resolve(result);
        });
        
    }

    
    /**
     * Inserts the order into our super secure, persistant data store.
     * @param {{ id }} order 
     * @returns {Promise<{order,status}>} 
     */
    placeOrder(order) {
        return new Promise((resolve, reject) => {
            const id = (Math.random() * 1000).toFixed(0);
            const status = statuses[0];
            const pizzas = order.pizzas.map(_formatPizza);
            // const orderRecord = _formatOrder(order);
            const orderRecord = Object.assign({},
                order,
                { 
                    pizzas, 
                    id, 
                    status 
                }
            );
            orders[id] = (orderRecord);
            resolve(orderRecord);
        });
    }

    /**
     * 
     * @param {String} orderId 
     * @returns {Promise<{ order, status }>}
     */
    checkOrder(orderId) {
        return new Promise((resolve, reject) => {
            const currentOrder = orders[orderId];
            //Enable for validation.
            //Screwed up the hosted demo - since it's in memory, it fails randomly.
            //If working local - check it out to see how the error effects it.
            // if(!currentOrder) {
            //     reject("No current order, please order a Pepperoni pizza, and then check the order");
            // }
            const randomIndex = Math.round(Math.random() * (statuses.length - 1))
            const status = statuses[randomIndex];
            const order = Object.assign({}, currentOrder, { status });
            resolve(order);
        });
    }
}

/**
 * 
 * @param {{ toppings: [{id, extra}], crust, sauce, extraToppings: [{id,extra}]}} pizza 
 */
function _formatPizza(pizza) {
    const pizzaToppings = toppings.filter(topping => {
        return pizza.toppings.map(pt => pt.id).indexOf(topping.id) > -1;
    });
    const extraToppings = pizza.extraToppings && toppings.filter(topping => {
        return pizza.extraToppings.map(pt => pt.id).indexOf(topping.id) > -1;
    }) || [];

    const actualSauce = sauces.find(sauce => sauce.id == pizza.sauce);
    const actualCrust = crusts.find(c => c.id === pizza.crust);

    const formattedPizza = {
        crust : actualCrust,
        sauce : actualSauce,
        toppings : pizzaToppings,
        extraToppings
    };

    return Object.assign(
        {},
        pizza,
        formattedPizza
    );
};

const aweInspiringOrderSystem = new AweInspiringOrderingSystem();



module.exports = {
    aweInspiringOrderSystem
};