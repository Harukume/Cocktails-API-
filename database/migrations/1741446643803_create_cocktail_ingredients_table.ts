import { BaseSchema } from '@adonisjs/lucid/schema'


export default class Ingredients extends BaseSchema {
  protected tableName = 'ingredient'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description')
      table.boolean('alcohol').defaultTo(false)
      table.string('image')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
