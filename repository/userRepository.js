const db = require('../pgConfig.js');

const getUsers = () => {
    return db.query('SELECT * FROM users ORDER BY id');
};

module.exports = {
    getUsers
}
