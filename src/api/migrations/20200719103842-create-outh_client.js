'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('oauth_clients', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            secret: {
                type: Sequelize.STRING,
            },
            redirect_uri: {
                type: Sequelize.STRING,
            },
            grants: {
                type: Sequelize.STRING,
            },
            scope: {
                type: Sequelize.STRING,
                defaultValue: 'default' 
            },
            revoked_at: {
                type: Sequelize.DATE,
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('oauth_clients');
    },
};
