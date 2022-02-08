const db = require('../dbConfig.js');

const getRecipes = () => {
    return db.query('SELECT * FROM recipes ORDER BY name');
};

const getRecipeById = (id) => {
    return db.query('SELECT name, recipe_id as recipeId, user_id as userId, description, prep_time as prepTime FROM recipes WHERE recipe_id = $1', [id]);
};

const getRecipeIngredients = (id) => {
    return db.query('SELECT * FROM ingredients join recipe_ingredients ON (ingredients.ingredient_id = recipe_ingredients.ingredient_id) WHERE recipe_id = $1', [id]);
};

const getIngredientByName = (name) => {
    return db.query('SELECT * FROM ingredients WHERE ingredient_name = $1', [name]);
};

const getRecipeInstructions = (id) => {
    return db.query('SELECT * FROM instructions where recipe_id = $1', [id]);
};

const addRecipe = ({name, description, userId, prepTime}) => {
    return db.query('INSERT INTO recipes (name, description, user_id, prep_time) values ($1, $2, $3, $4) RETURNING recipe_id', [name, description, userId, prepTime]);
};

const addIngredient = (name) => {
    return db.query('INSERT INTO ingredients (ingredient_name) VALUES ($1) RETURNING ingredient_id', [name]);
};

const addRecipeIngredients = (recipeId, ingredientId, qty, qtyType) => {
    return db.query('INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, quantity_type) values ($1, $2, $3, $4)', [recipeId, ingredientId, qty, qtyType]);
};

const addInstruction = (recipeId, text, render_order) => {
    return db.query('INSERT INTO instructions (recipe_id, text, render_order) VALUES ($1, $2, $3)', [recipeId, text, render_order]);
};

module.exports = {
    getRecipes,
    getRecipeById,
    getRecipeIngredients,
    getIngredientByName,
    getRecipeInstructions,
    addRecipe,
    addIngredient,
    addRecipeIngredients,
    addInstruction,
};
