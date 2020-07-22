import db from '~/config/sequelize';

const { User } = db;

class UserController {
    static async index(req, res, next) {
        try {
            const users = await User.findAll();

            return res.status(200).json(users);
        } catch (err) {
            return next(err);
        }
    }
}

export default UserController;
