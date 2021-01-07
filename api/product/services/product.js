'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {

    /**
     * Promise to fetch all records
     *
     * @return {Promise}
     */
    find(params, populate) {
        return strapi.query('product').find(params, populate);
    },
    /**
    * Promise to fetch record
    *
    * @return {Promise}
    */

    findOne(params, populate) {
        return strapi.query('product').findOne(params, populate);
    },

    /**
     * Links a product to a user.
     *
     * @return {Object}
     */
    async unlockProduct(user, productId) {
        const products = await strapi.plugins['strapi-plugin-membership-light'].services.product.find({users_contains: user, _limit: -1});
        const found = products.find((product) => { return product.id == productId})

        if(found) {
            return {status: 'Ok'}
        }
        
        await strapi.plugins['users-permissions'].services.user.edit({id: user}, {products: [...products, productId]})
        return {status: 'Ok'}
    }
};
