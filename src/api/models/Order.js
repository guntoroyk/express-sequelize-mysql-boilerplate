import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;

    class Order extends Model {}
    Order.init(
        {
            invoice: DataTypes.STRING,
            user_id: DataTypes.UUID,
            product_id: DataTypes.UUID,
            quantity: DataTypes.INTEGER,
            payment_code: DataTypes.INTEGER,
            total_price: DataTypes.INTEGER,
            payment_method: DataTypes.STRING,
            status: DataTypes.ENUM('new', 'paid', 'processing', 'done'),
            note: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'order',
        }
    );

    Order.associate = function (models) {
        // Association can be defined here
        // Order.belongsTo(models.user);
        Order.belongsTo(models.product);
    };

    Order.beforeCreate((order) => {
        order.id = uuidv4();
    });
    return Order;
};
