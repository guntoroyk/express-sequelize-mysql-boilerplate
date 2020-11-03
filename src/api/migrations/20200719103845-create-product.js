module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            image_url: {
                type: Sequelize.STRING,
            },
            video_url: {
                type: Sequelize.STRING,
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            published: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('products');
    },
};
