/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    message: 'Have a good day :D',
  }
})

const IngredientsController = () => import('#controllers/ingredients_controller')
const CocktailsController = () => import('#controllers/cocktails_controller')
const Cocktail_IngredientsController = () => import('#controllers/cocktail_ingredients_controller')

// SELECT

// select * from ingredient
router.get('/ingredients', [IngredientsController, 'index'])
// select * from cocktail
router.get('/cocktails', [CocktailsController, 'index'])
// select id from cocktails
router.get('/cocktails/:id', [CocktailsController, 'GetCocktails'])
// select * from cocktail_ingredients
router.get('/cocktail_ingredients', [Cocktail_IngredientsController, 'index'])


// INSERT
// insert ingredient
router.post('/ingredients', [IngredientsController, 'CreateIngredient'])
// insert cocktail
router.post('/cocktails', [CocktailsController, 'CreateCocktail'])

// DELETE 
// delete ingredient by id
router.delete('/ingredients/:id', [IngredientsController, 'DeleteIngredient'])
// delete cocktail by id
router.delete('/cocktails/:id', [CocktailsController, 'DeleteCocktail'])

// UPDATE 
// update ingredient 
router.patch('/ingredients/:id', [IngredientsController, 'UpdateIngredient'])
// update cocktail
router.patch('/cocktails/:id', [CocktailsController, 'UpdateCocktail'])

// check db connection
const HealthChecksController = () => import('#controllers/health_checks_controller')
router.get('/health', [HealthChecksController])