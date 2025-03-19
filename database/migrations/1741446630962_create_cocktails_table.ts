import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cocktail' // poprawiłem nazwę tabeli na 'cocktails'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // klucz główny, autoinkrementujący
      table.string('name').notNullable()
      table.string('category')
      table.text('instructions')

      // Standardowe kolumny created_at i updated_at
      table.timestamp('created_at').defaultTo(this.now()).notNullable() // domyślna wartość to teraz
      table.timestamp('updated_at').defaultTo(this.now()).notNullable() // domyślna wartość to teraz
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
