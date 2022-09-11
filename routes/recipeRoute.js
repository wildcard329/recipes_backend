const router = require('express').Router();
const recipes = require('../controller/recipeController.js');

router.get('/', async (req, res) => {
    try {
        const results = await recipes.getRecipes();
        res.status(200).json(results);
    } catch (err) {
        res.json(err);
    };
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        let [ recipe, ingredients, instructions ] = await Promise.all([recipes.getRecipeById(id), recipes.getRecipeIngredients(id), recipes.getRecipeInstructions(id)]);
        const results = { ...recipe, prepTime: prep_time, ingredients, instructions }
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/', async (req, res) => {
    const {name, description, userId, prepTime, ingredients, instructions} = req.body;
    try {
        await recipes
            .addRecipe({name, description, userId, prepTime})
            .then(async recipeId => {
                let [ingredientStatus, instructionStatus] = await Promise.all([recipes.addIngredients(ingredients, recipeId), recipes.addInstructions(instructions, recipeId)]);
                console.log('data ',ingredientStatus, instructionStatus)
            })  
            .catch(err => res.send(err))                      
        res.status(201).send('ok')
    } catch (err) {
        res.status(500).json('Error on db');
    };

});

module.exports = router;
