module.exports = {
    // eslint-disable-next-line
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
        const data = [];

        if (process.env.WEB_CLIENT_ID) {
            data.push({
                id: process.env.WEB_CLIENT_ID,
                name: 'Web Client',
                secret: process.env.WEB_CLIENT_SECRET,
                grants: 'password, refresh_token',
                created_at: new Date(),
                updated_at: new Date(),
            });
        }

        if (process.env.ANDROID_CLIENT_ID) {
            data.push({
                id: process.env.ANDROID_CLIENT_ID,
                name: 'Android Client',
                secret: process.env.ANDROID_CLIENT_SECRET,
                grants: 'password, refresh_token',
            });
        }

        if (process.env.IOS_CLIENT_ID) {
            data.push({
                id: process.env.IOS_CLIENT_ID,
                name: 'iOS Client',
                secret: process.env.IOS_CLIENT_SECRET,
                grants: 'password, refresh_token',
            });
        }

        await queryInterface.bulkInsert('oauth_clients', data, {});
    },

    // eslint-disable-next-line
    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('oauth_clients', null, {});
    },
};
