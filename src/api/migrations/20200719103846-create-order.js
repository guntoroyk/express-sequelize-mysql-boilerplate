module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            invoice: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            product_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id',
                },
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            payment_code: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            total_price: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            payment_method: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'BANK TRANSFER',
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM('new', 'paid', 'processing', 'done'),
                defaultValue: 'new',
            },
            note: {
                type: Sequelize.STRING,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deleted_at: {
                type: Sequelize.DATE,
            },
        });
    },
    // eslint-disable-next-line
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('orders');
    },
};
