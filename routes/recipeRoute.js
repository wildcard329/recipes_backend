const router = require('express').Router();
const recipes = require('../controller/recipeController.js');

router.get('/', async (req, res) => {
    try {
        const results = await recipes.getRecipes();
        res.status(200).json(results.rows);
    } catch (err) {
        res.json(err);
    };
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const results = await recipes.getRecipeById(id);
        res.status(200).json(results.rows[0]);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/', async (req, res) => {
    const {name, description, author, owner, original, image_id} = req.body;
    try {
        const recipe_id = await recipes.addRecipe({name, description, author, owner, original, image_id});
        res.status(201).json(recipe_id)
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;
