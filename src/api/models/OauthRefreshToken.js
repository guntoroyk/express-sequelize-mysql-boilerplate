import { v4 as uuidv4 } from 'uuid';

module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;

    class OauthRefreshToken extends Model {}
    OauthRefreshToken.init(
        {
            oauth_client_id: DataTypes.STRING,
            user_id: DataTypes.STRING,
            token: DataTypes.STRING,
            expires_at: DataTypes.DATE,
            revoked_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'oauthRefreshToken',
        }
    );

    OauthRefreshToken.associate = function (models) {
        // Association can be defined here  OauthAccessToken.belongsTo(models.OauthClient)
        OauthRefreshToken.belongsTo(models.oauthClient)
        OauthRefreshToken.belongsTo(models.user)
    };

    OauthRefreshToken.beforeCreate((oauthRefreshToken) => {
        oauthRefreshToken.id = uuidv4();
    });
    return OauthRefreshToken;
};
