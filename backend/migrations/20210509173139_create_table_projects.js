
exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('parentId').references('id')
            .inTable('projects')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('projects')
};
