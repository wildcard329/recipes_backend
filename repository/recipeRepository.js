const db = require('../dbConfig.js');

const getRecipes = () => {
    return db.query('SELECT * FROM recipes ORDER BY recipe_name');
};

const getRecipeById = (id) => {
    return db.query('SELECT * FROM recipes WHERE recipe_id = $1', [id]);
};

const addRecipe = ({name, description, author, owner, original, image_id}) => {
    return db.query('INSERT INTO recipes (recipe_name, recipe_description, author, owner, original, image_id) values ($1, $2, $3, $4, $5, $6) RETURNING recipe_id', [name, description, author, owner, original, image_id]);
};

module.exports = {
    getRecipes,
    getRecipeById,
    addRecipe
};
