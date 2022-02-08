const recipes = require('../repository/recipeRepository.js');

class RecipeController {
    static async getRecipes() {
        const allRecipes = await recipes.getRecipes();
        return allRecipes.rows;
    };

    static async getRecipeById(id) {
        const recipe = await recipes.getRecipeById(id);
        return recipe.rows[0];
    };
    
    static async getRecipeIngredients(id) {
        const ingredients = await recipes.getRecipeIngredients(id);
        return ingredients.rows;
    };
    
    static async getRecipeInstructions(id) {
        const instructions = await recipes.getRecipeInstructions(id);
        return instructions.rows;
    };

    static async addRecipe({name, description, userId, prepTime}) {
        const recipe_id = await recipes.addRecipe({name, description, userId, prepTime});
        return recipe_id.rows[0].recipe_id;
    };

    static async addIngredients(ingredientsArray, recipeId) {
        await ingredientsArray.map(async ingredient => {
            console.log('id is ',recipeId)
            const { quantity, quantity_type, ingredient_name } = ingredient;
            const databaseIngredient = await recipes.getIngredientByName(ingredient_name);
            if (!databaseIngredient.rows[0]) {
                recipes
                    .addIngredient(ingredient_name)
                    .then(async id => {
                        await recipes.addRecipeIngredients(recipeId, id.rows[0].ingredient_id, quantity, quantity_type)
                    });

            } else {
                recipes.addRecipeIngredients(recipeId, databaseIngredient.rows[0].ingredient_id, quantity, quantity_type)
            }

        })
        return 'ok';
    }

    static async addInstructions(instructionsArray, recipeId) {
        await instructionsArray.map(instruction => {
            recipes.addInstruction(recipeId, instruction.text, instruction.render_order);
        });
        return 'ok'
    };
};

module.exports = RecipeController;
