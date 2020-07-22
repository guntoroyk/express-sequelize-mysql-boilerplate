'use strict';
import bcrypt from '~/api/helpers/bcrypt';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    id: 'c5802ea9-36dd-4af2-99cc-c1a254a0cdd7',
                    first_name: 'Admin',
                    last_name: '',
                    email: 'admin.01@mail.com',
                    password: bcrypt.hashPassword('admin.01'),
                    role: 'admin',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users', null, {});
    },
};
