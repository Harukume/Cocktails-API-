import Cocktail_Ingredients from "#models/cocktail_ingredients"

// import type { HttpContext } from '@adonisjs/core/http'


export default class Cocktail_IngredientsController {
    public async index(){
        const cocktail_ingredients = await Cocktail_Ingredients.query()
        return cocktail_ingredients
    }
}