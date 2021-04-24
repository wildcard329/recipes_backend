const router = require('express').Router();
const users = require('../controller/userController.js');

router.get('/', async (req, res) => {
    try {
        const results = await users.getUsers();
        res.status(200).json(results.rows);
    } catch (err) {
        res.json(err);
    };
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await users.getUserById(id);

        if (results) {
            res.status(200).json(results.rows[0]);
        } else {
            res.status(404).json({msg: `User with id ${id} not found.`})
        }

    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const results = await users.createUser({username, password, email});
        res.status(201).json({msg: `User with id ${results.rows.user_id} created.`})
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const results = await users.loginUser({username, password});
        if (results) {
            res.status(200).json(results.rows[0]);
        } else {
            res.status(400).json({msg: 'Incorrect username or password.'});
        };
    } catch (err) {
        res.status(500).json(err);
    };
});

router.put('/:id', async (req, res) => {
    const { username, password, email } = req.body;
    const id = parseInt(req.params.id);
    try {
        const results = await users.updateUser({username, password, email, id});
        if (results) {
            res.status(200).json({msg: `User with id ${id} updated.`})
        } else {
            res.status(404).json({msg: `User with id ${id} not found.`});
        };
    } catch (err) {
        res.status(500).json(err);
    };
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const results = await users.deleteUser(id);
        if (results) {
            res.status(200).json({msg: `User with id ${id} deleted.`});
        } else {
            res.status(404).json({msg: `User with id ${id} not found.`});
        };
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;
