const db = require('../dbConfig.js');

const getUsers = () => {
    return db.query('SELECT * FROM users ORDER BY id');
};

module.exports = {
    getUsers
}
