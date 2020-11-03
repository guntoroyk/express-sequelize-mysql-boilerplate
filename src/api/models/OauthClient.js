import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;

    class OauthClient extends Model {}
    OauthClient.init(
        {
            name: DataTypes.STRING,
            secret: DataTypes.STRING,
            redirect_uri: DataTypes.STRING,
            grants: DataTypes.STRING,
            scope: DataTypes.STRING,
            revoked_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'oauthClient',
        }
    );

    // eslint-disable-next-line
    OauthClient.associate = function (models) {
        // Association can be defined here
    };

    OauthClient.beforeCreate((oauthClient) => {
        oauthClient.id = uuidv4();
    });
    return OauthClient;
};
