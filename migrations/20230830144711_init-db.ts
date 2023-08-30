import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("posts", (table) => {
        // Match this up with model Post in the schema.prisma.
        // 25 is the max char count.
        table.string('id', 25).primary()
        table.string('content', 280).notNullable()
        // Adding index to order the table by createdAt.
        table.timestamp("createdAt").defaultTo(knex.fn.now()).index()
        table.timestamp("updatedAt").defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('posts')
}
