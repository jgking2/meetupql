const { GraphQLEnumType } = require('graphql');
const { aweInspiringOrderSystem } = require('../aweInspiringOrderingSystem');

const { 
    toppingCategories, 
    statuses,
    sizes,
    partTypes
} = aweInspiringOrderSystem;

/**
 * An alternate method to create enums.
 */

// enum ToppingCategory { ${aweInspiringOrderSystem.toppingCategories} }
const toppingCategoryEnum = new GraphQLEnumType({
    name : 'ToppingCategory',
    values : createEnumValues(toppingCategories)
});
    
// enum Status { ${aweInspiringOrderSystem.statuses} }
const orderStatusEnum = new GraphQLEnumType({
    name : 'Status',
    values : createEnumValues(statuses)
});

//  enum Size { ${aweInspiringOrderSystem.sizes} }
const pizzaSizeEnum = new GraphQLEnumType({
    name : 'Size',
    values : createEnumValues(sizes)
});

// enum PartType { ${Object.keys(aweInspiringOrderSystem.partTypes)} }
const pizzaPartTypeEnum = new GraphQLEnumType({
    name : 'PartType',
    values : createEnumValues(
        Object.keys(partTypes)
    )
});

module.exports = {
    pizzaPartTypeEnum,
    orderStatusEnum,
    pizzaSizeEnum,
    toppingCategoryEnum
};
/**
 * Helper function to generate enum values.
 * format is KEY : {}
 * @param {[string]} list 
 * @returns {[]} 
 */
function createEnumValues(list) {
    const values = list.reduce((prev, curr) => {
        prev[curr] = {};
        return prev;
    }, {});
    return values;
}