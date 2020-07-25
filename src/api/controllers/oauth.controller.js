import OauthServer from 'oauth2-server';
import snakeCase from 'snakecase-keys';
import OauthModel from '~/api/helpers/oauthModel';
import APIError from '~/api/helpers/APIError';
import logger from '~/config/winston/get-default-logger';

const oauth = new OauthServer({
    model: OauthModel
})

class OauthController {
    static async handle(req, res, next) {
        try {
            const request = new OauthServer.Request(req);
            const response = new OauthServer.Response(res);

            const token = await oauth.token(request, response);

            delete token.client;

            return res.status(200).json(snakeCase(token));
        } catch (err) {
            const error = new APIError(err.message, err.statusCode || 500, true);
            logger.info(JSON.stringify(err, null, 2))
            return next(error);
        }
    }
};

export default OauthController;
