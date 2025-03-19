import Cocktail from "#models/cocktail"
import Cocktail_Ingredients from "#models/cocktail_ingredients"


import type { HttpContext } from '@adonisjs/core/http'

export default class CocktailsController {
    // return everything
    public async index(){
        const cocktails = await Cocktail.query().preload('ingredients')
        return cocktails
    }

    // return cocktail by id
    public async GetCocktails({ params }: HttpContext){
        const cocktails = await Cocktail.query().where('id', params.id).preload('ingredients')
        return cocktails || {message: 'Cocktail not found'}
    }

    // create cocktail 
    public async CreateCocktail({ request, response }: HttpContext){

        // data request
        const data = request.only(['name', 'category', 'instructions', 'ingredients'])

        // creating cocktail
        const cocktail = await Cocktail.create(
            {
                name: data.name,
                category: data.category,
                instructions: data.instructions,
            }
        )
        
        // adding ingredients to cocktail
        if (data.ingredients && data.ingredients.length > 0) {
            const ingredientsData = data.ingredients.reduce((acc: { [x: string]: { quantity: any } }, ingredient: { id: string | number; quantity: any }) => {
            acc[ingredient.id] = { quantity: ingredient.quantity }
            return acc
            }, {})

            // adding ingredients to pivot table
            await cocktail.related('ingredients').attach(ingredientsData)
        }

        return response.status(201).json(cocktail)
    }
    // delete cocktail
    public async DeleteCocktail({params, response}:HttpContext){
        const cocktail = await Cocktail.find(params.id)
        if (!cocktail){
            return response.status(404).json({"Error": "Cocktail not found"})
        }

        // delete connections 
        await cocktail.related('ingredients').detach()

        //delete cocktail
        await cocktail.delete()

        return response.status(200).json({ message: "Cocktail deleted successfully" })
    }

    
    // update cocktail
    public async UpdateCocktail({params, request, response}: HttpContext){
        const cocktail = await Cocktail.find(params.id)
        if (!cocktail){
            return response.status(404).json({"Error": "Cocktail not found"})
        }

        const data = request.only(['name', 'description', 'alcohol', 'image'])

        // updating cocktail
        cocktail.merge(data)
        await cocktail.save()

        return response.status(200).json(cocktail)
    }
}