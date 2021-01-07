const { sanitizeEntity } = require('strapi-utils');

'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async find(ctx) {
        let entities;

        const {user} = ctx.state

        if (ctx.query._q) {
            entities = await strapi.product.search(ctx.query);
        } else {
            entities = await strapi.services.product.find(ctx.query);
        }

        if(entities){
            entities.map(entity => {
                if(user && entity.users){
                    const found = entity.users.find((element) => { return element.id === user.id})

                    if(!found) {
                        entity.download = 'Please purchase this product, get in touch with support for help'
                    }
                } else {
                    entity.download = 'Please purchase this product, get in touch with support for help'
                }
            })
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.product }));
    },
    /**
     * Retrieve a record.
     *
     * @return {Object}
     */

    async findOne(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state

        const entity = await strapi.services.product.findOne({ id });

        if(entity) {
            if(user && entity.users){
                const found = entity.users.find((element) => { return element.id === user.id})
    
                if(!found) {
                    entity.download = 'Please purchase this product, get in touch with support for help'
                }
            } else {
                entity.download = 'Please purchase this product, get in touch with support for help'
            }
        }
        
        return sanitizeEntity(entity, { model: strapi.models.product });
    },
    

};
