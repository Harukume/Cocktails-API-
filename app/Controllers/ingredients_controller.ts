import type { HttpContext } from '@adonisjs/core/http'
import Ingredient from "#models/ingredient";

export default class IngredientsController {
    public async index(){
        const ingredients = await Ingredient.all()
        return ingredients
    }
        // create ingredient
    public async CreateIngredient({ request, response }: HttpContext){
        const data = request.only(['name', 'description', 'alcohol', 'image'])
        const ingredient = await Ingredient.create({
            name: data.name,
            description: data.description,
            alcohol: data.alcohol,
            image: data.image,
        }
        )

        if(!ingredient){
            return response.status(400).json({error:"ingredient weren't created"})
        }

        await ingredient.save()

        return response.status(201).json(ingredient)

    }

    // delete ingredient
    public async DeleteIngredient({params, response}:HttpContext){
        const ingredient = await Ingredient.find(params.id)
        if (!ingredient){
            return response.status(404).json({"Error": "Ingredient not found"})
        }

        await ingredient.delete()
        return response.status(200).json({ message: "Ingredient deleted successfully" })
    }

    // update ingredient 
    public async UpdateIngredient({params, request, response}: HttpContext){
        const ingredient = await Ingredient.find(params.id)
        if (!ingredient){
            return response.status(404).json({"Error": "Ingredient not found"})
        }

        const data = request.only(['name', 'description', 'alcohol', 'image'])

        // updating ingredient
        ingredient.merge(data)
        await ingredient.save()

        return response.status(200).json(ingredient)
    }
}