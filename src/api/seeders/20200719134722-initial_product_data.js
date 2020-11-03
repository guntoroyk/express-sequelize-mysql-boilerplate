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
        await queryInterface.bulkInsert(
            'products',
            [
                {
                    id: '3f65a089-3df9-42c0-86e3-c84b14f55d2c',
                    name: 'Motion Graphics #1',
                    description:
                        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
                    price: 1000000,
                    image_url: 'http://via.placeholder.com/300.png?',
                    video_url: 'https://youtu.be/k1qOy4N2Pxo',
                    published: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    // eslint-disable-next-line
    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('products', null, {});
    },
};
