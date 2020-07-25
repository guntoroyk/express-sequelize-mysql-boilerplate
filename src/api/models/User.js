import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;

    class User extends Model {}
    User.init(
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: {
                type: DataTypes.ENUM('admin', 'user'),
                defaultValue: 'user',
            },
            scope: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );

    User.associate = function (models) {
        // Association can be defined here
    };

    User.beforeCreate((user) => {
        user.id = uuidv4();
    });
    return User;
};
