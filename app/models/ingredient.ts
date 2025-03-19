import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Cocktail from './cocktail.js'
import { DateTime } from 'luxon'

export default class Ingredient extends BaseModel {
  public static table = 'ingredient'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare alcohol: boolean

  @column()
  declare image: string

  @manyToMany(() => Cocktail, {
    pivotTable: 'cocktail_ingredients', 
    pivotForeignKey: 'ingredientl_id', 
    pivotRelatedForeignKey: 'cocktail_id', 
    pivotColumns: ['quantity'],
  })
  @column()
  declare cocktail: ManyToMany<typeof Cocktail>
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
