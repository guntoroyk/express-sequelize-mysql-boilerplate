import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;

    class OauthAccessToken extends Model {}
    OauthAccessToken.init(
        {
            oauth_client_id: DataTypes.STRING,
            user_id: DataTypes.STRING,
            token: DataTypes.STRING,
            expires_at: DataTypes.DATE,
            revoked_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'oauthAccessToken',
        }
    );

    OauthAccessToken.associate = function (models) {
        // Association can be defined here
        OauthAccessToken.belongsTo(models.oauthClient);
        OauthAccessToken.belongsTo(models.user);
    };

    OauthAccessToken.beforeCreate((oauthAccessToken) => {
        oauthAccessToken.id = uuidv4();
    });
    return OauthAccessToken;
};
