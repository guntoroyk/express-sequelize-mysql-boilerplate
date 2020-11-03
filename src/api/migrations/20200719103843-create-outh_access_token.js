'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('oauth_access_tokens', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            oauth_client_id: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'oauth_clients',
                    key: 'id',
                },
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            token: {
                type: Sequelize.TEXT,
            },
            expires_at: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('oauth_access_tokens');
    },
};
