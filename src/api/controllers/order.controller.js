import db from '~/config/sequelize';

const { order: Order, user: User, product: Product } = db;

class OrderController {
    static async index(req, res, next) {
        try {
            const orders = await Order.findAll({
                include: [
                    // { model: User },
                    { model: Product },
                ]
            });

            return res.status(200).json(orders);
        } catch (err) {
            return next(err);
        }
    }
}

export default OrderController;
