const users = require('../repository/userRepository.js');
const functions = require('../helper_functions/authFunctions.js');

class UserController {
    static async getUsers() {
        const cookbookUsers = await users.getUsers();
        return cookbookUsers;
    };

    static async getUserById(id) {
        const user = await users.getUserById(id);
        if (user.rows.length) {
            return user;
        } else {
            return null;
        }
    };

    static async getUserByUsername(username) {
        return await users.getUserByUsername(username);
    };

    static async createUser({username, password, email}) {
        const saltedPassword = await functions.saltPassword(password);
        return await users.createUser({username, saltedPassword, email});
    };

    static async loginUser({username, password}) {
        const user = await this.getUserByUsername(username);
        if (functions.compareUserPassword(password, user.password)) {
            return await functions.generateToken(user);
        } else {
            return null;
        }
    };

    static async updateUser({username, password, email, id}) {
        const user = await this.getUserById(id);
        const saltedPassword = await functions.saltPassword(password);
        if (user) {
            if (user.rows[0].user_name !== username) {
                console.log('flag', user.rows[0].user_name,'flag2', username);
                const userUpdate = await users.updateUserAndUsername({username, saltedPassword, email, id});
                console.log(userUpdate);
                return userUpdate;
            } else {
                const userUpdate = await users.updateUser({saltedPassword, email, id});
                console.log(userUpdate);
                return userUpdate;
            }
        } else {
            return null;
        };
    };

    static async deleteUser(id) {
        const user = await this.getUserById(id);
        if (user) {
            return await users.deleteUser(id);
        } else {
            return null;
        };
    };
};

module.exports = UserController;
