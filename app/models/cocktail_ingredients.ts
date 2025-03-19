import { BaseModel, column } from '@adonisjs/lucid/orm'
// import { DateTime } from 'luxon'

export default class Cocktail_Ingredients extends BaseModel {
  public static table = 'cocktail_ingredients'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare coctailId: number

  @column()
  declare ingredientIid: number

  @column()
  declare quantity: string

  // @column.dateTime({ autoCreate: true })
  // declare createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // declare updatedAt: DateTime
}
