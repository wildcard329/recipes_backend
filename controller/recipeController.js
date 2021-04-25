const recipes = require('../repository/recipeRepository.js');
const users = require('../repository/userRepository.js');

class RecipeController {
    static async getRecipes() {
        const allRecipes = await recipes.getRecipes();
        return allRecipes;
    };

    static async getRecipeById(id) {
        const recipe = await recipes.getRecipeById(id);
        return recipe;
    };

    static async addRecipe({name, description, author, owner, original, image_id}) {
        const recipe_id = await recipes.addRecipe({name, description, author, owner, original, image_id});
        return recipe_id;
    }
};

module.exports = RecipeController;
