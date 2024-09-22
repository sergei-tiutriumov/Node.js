import { matchedData, validationResult } from 'express-validator';

export function handleErrors(req, res, next) {
    const r = validationResult(req);
    if (!r.isEmpty())
        res.redirect('back');
    else {
        req.body = matchedData(req);
        next();
    }
}
export function requestToContext (req, res, next) {
    res.locals.req = req;
    next();
}