import uniqid from 'uniqid';
import jwt from 'jsonwebtoken';
import config from '~/config/config';
import db from '~/config/sequelize';
import bcrypt from '~/api/helpers/bcrypt';

const { 
    oauthClient: OauthClient, 
    oauthAccessToken: OauthAccessToken, 
    oauthRefreshToken: OauthRefreshToken, 
    user: User 
} = db;

class OauthModel {
    static async getAccessToken(accessToken) {
        try {
            var decoded = jwt.verify(accessToken, config.jwtSecret, {
                ignoreExpiration: true,
            });
        } catch (err) {
            return false;
        }
        try {
            const oauthAccessToken = await OauthAccessToken.findOne({
                where: { id: decoded.id },
            });

            if (oauthAccessToken) {
                return {
                    accessToken: accessToken,
                    accessTokenExpiresAt: oauthAccessToken.expires_at,
                    user: decoded.user,
                    client: {
                        id: oauthAccessToken.oauth_client_id,
                    },
                };
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    static async getRefreshToken(refreshToken) {
        try {
            const oauthRefreshToken = await OauthRefreshToken.findOne({
                where: { token: refreshToken },
            });

            if (oauthRefreshToken) {
                return {
                    refreshToken: oauthRefreshToken.token,
                    refreshTokenExpiresAt: oauthRefreshToken.expires_at,
                    user: {
                        id: oauthRefreshToken.user_id,
                    },
                    client: {
                        id: oauthRefreshToken.oauth_client_id,
                    },
                };
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    static async generateAccessToken(client, user, scope) {
        try {
            const aUser = await User.findOne({ where: { id: user.id } });

            if (aUser) {
                let data = {
                    id: aUser.id,
                    role: aUser.role,
                };

                let options = {
                    algorithm: 'HS256',
                    // subject: client.id,
                    expiresIn: config.jwtExpiration,
                };

                let token = jwt.sign(
                    {
                        id: uniqid(),
                        user: data,
                    },
                    config.jwtSecret,
                    options
                );
                return token;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    static async saveToken(token, client, user) {
        try {
            var decoded = jwt.verify(token.accessToken, config.jwtSecret, {
                ignoreExpiration: true,
            });
            var value = {
                id: decoded.id,
                user_id: user.id,
                oauth_client_id: client.id,
                token: token.accessToken, 
                expires_at: new Date(decoded.exp * 1000),
            };
        } catch (err) {
            return false;
        }

        try {
            await OauthAccessToken.create(value);

            await OauthRefreshToken.create({
                id: uniqid(),
                user_id: user.id,
                oauth_client_id: client.id,
                token: token.refreshToken,
                expires_at: token.refreshTokenExpiresAt,
            });

            token.client = client;
            token.user = user;

            return token;
        } catch (err) {
            return false;
        }
    }

    static async revokeToken(token) {
        try {
            await OauthRefreshToken.destroy({ where: { token: token.refreshToken }});
            return true;
        } catch (err) {
            return false;
        }
    }
    
    static async getClient(clientId, clientSecret) {

        try {
            const secret = clientSecret ? clientSecret : null;
            const oauthClient = await OauthClient.findOne({ 
                where: { 
                    id: clientId,
                    secret,
                    revoked_at: null
                }
            });
            
            if (oauthClient) {
                return {
                    id: oauthClient.id,
                    redirectUris: oauthClient.redirect_uri ? [oauthClient.redirect_uri] : [],
                    grants: oauthClient.grants.split(/[^a-z_]+/),
                    scope: oauthClient.scope,
                    accessTokenLifetime: config.jwtExpiration,
                    refreshTokenLifetime: config.oauthRefreshExpiration
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
    
    static validateScope(user, client, scope) {
		return (user.scope == client.scope) ? user.scope : false;
    }
    
    static async getUser(username, password) {
        try {
            const user = await User.findOne({ where: { email: username.toLowerCase() }});

            if (user && bcrypt.comparePassword(password, user.password)) {
                return {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role: user.role,
                    scope: user.scope
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
	}
}


export default OauthModel;
