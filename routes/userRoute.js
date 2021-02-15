const router = require('express').Router();
const users = require('../repository/userRepository.js');

router.get('/all', (req, res) => {
    users.getUsers()
        .then(results => {
            res.status(200).json(results.rows);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;
