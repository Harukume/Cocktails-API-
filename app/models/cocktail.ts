import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Ingredient from './ingredient.js'
import { DateTime } from 'luxon'

export default class Cocktail extends BaseModel {
   public static table = 'cocktail'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare category: string

  @column()
  declare instructions: string

  @manyToMany(() => Ingredient, {
    pivotTable: 'cocktail_ingredients', // Tabela pośrednia
    pivotForeignKey: 'cocktail_id', // Klucz w tabeli pośredniej
    pivotRelatedForeignKey: 'ingredient_id', // Klucz powiązany z `Ingredient`
    pivotColumns: ['quantity'], // kolumna którą ma zwracać
    
  })
  declare ingredients: ManyToMany<typeof Ingredient> 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}