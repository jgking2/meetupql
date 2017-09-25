class Sauce {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

class Crust {
    /**
     * 
     * @param {string} name 
     * @param {string} description 
     * @param {float} additionalCost 
     */
    constructor(name, description, additionalCost = undefined) {
        this.name = name;
        this.description = description;
        this.additionalCost = additionalCost;
    }
}

class Topping {
    constructor(name, description, price, category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }
}

const statuses = [
    'PLACED',
    'OVEN',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
    'DRIVER_ATE_YOUR_PIZZA_SORRY'
];

const partTypes = {
    TOPPING : 'TOPPING',
    CRUST : 'CRUST',
    SAUCE : 'SAUCE'
};

const toppingCategories = {
    VEGETABLE : 'VEGETABLE',
    MEAT : 'MEAT'
};

const toppings = withIdFromIndex([
    new Topping("Pepperoni", 'Scientifically proven best topping.', 1.99, toppingCategories.MEAT),
    new Topping("Beef", 'Made from the finest of moo\'ers', 1.99, toppingCategories.MEAT),
    new Topping("Bacon", 'Made from the finest of moo\'ers', 1.99, toppingCategories.MEAT),
    new Topping("Mushrooms", 'It works for Super Mario', .99, toppingCategories.VEGETABLE),
    new Topping("Red Peppers", 'Hot chili is not missing.', .99, toppingCategories.VEGETABLE)
]);

const crusts = withIdFromIndex([
    new Crust("Homemade Pan", "Is deep dish the same thing?"),
    new Crust("Hand Tossed", "Hopefully they washed their hands before tossing it."),
    new Crust("Thin", "This isn\'t descriptive enough? Flat, not fluffy...maybe crispy"),
    new Crust("Stuffed Crust", "The best crust, wrapped around cheese...mmmmmmmmmm...", 1.99)
]);

const sauces = withIdFromIndex([
    new Sauce("Marinara", "Standard sauce"),
    new Sauce("White Sauce", "No clue, stole from Papa Johns.")
]);

/**
* Appends id to the items in the list, horribly presumptious function
* @param {[]} list 
* @returns {[]} list with id from index.
*/
function withIdFromIndex(list) {
    return list.map((item, index) => {
        item.id = (++index).toString();
        return item;
    });
};

module.exports = {
    toppings,
    crusts,
    sauces,
    statuses,
    toppingCategories,
    partTypes,
    Sauce,
    Topping,
    Crust
};