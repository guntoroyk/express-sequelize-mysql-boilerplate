import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;

    class Product extends Model {}
    Product.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.INTEGER,
            published: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'product',
        }
    );

    Product.associate = function (models) {
        // Association can be defined here
        Product.hasMany(models.order);
    };

    Product.beforeCreate((product) => {
        product.id = uuidv4();
    });
    return Product;
};
