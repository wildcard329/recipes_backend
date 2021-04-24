const db = require('../dbConfig.js');

const getUsers = () => {
    return db.query('SELECT * FROM users ORDER BY user_id');
};

const getUserById = (id) => {
    return db.query('SELECT * FROM users WHERE user_id = $1', [id]);
};

const getUserByUsername = (username) => {
    return db.query('SELECT * FROM users WHERE user_name = $1', [username]);
};

const createUser = ({username, saltedPassword, email}) => {
    return db.query('INSERT INTO users (user_name, password, user_email) VALUES ($1, $2, $3) RETURNING user_id', [username, saltedPassword, email]);
};

const updateUser = ({username, saltedPassword, email, id}) => {
    return db.query('UPDATE users SET user_name = $1, password = $2, user_email = $3 WHERE user_id = $4', [username, saltedPassword, email, id]);
};

const deleteUser = (id) => {
    return db.query('DELETE FROM users WHERE user_id = $1', [id]);
};

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
};
