import {Request, Response, NextFunction} from 'express';

//const CORS_ALLOWED_ORIGINS = ['*'];
const CORS_ALLOWED_HEADERS = 'api-key, X-Conversation-UUID, content-type';

/**
 * This is a middleware that can be mounted on an express server.
 * It handles the preflight CORS requests sent from e.g. browser. It allows the origins in CORS_ALLOWED_ORIGINS and
 * the headers in CORS_ALLOWED_HEADERS.
 *
 * If your server uses other headers, please update the CORS_ALLOWED_HEADERS constant accordingly.
 *
 * CORS_ALLOWED_HEADERS should be a comma separated string
 *
 * @param req
 * @param res
 * @param next
 */
export function handleCORS(req: Request, res: Response, next: NextFunction) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', CORS_ALLOWED_HEADERS);
    res.set('Access-Control-Expose-Headers', CORS_ALLOWED_HEADERS)

    if (req.method === 'OPTIONS' && req.header('Access-Control-Request-Method') !== undefined && req.header('Access-Control-Request-Headers') !== undefined) {
        // this in only the preflight CORS request => only send the Access-Control headers without checking auth.
        res.send(null);
    } else {
        return next();
    }
}