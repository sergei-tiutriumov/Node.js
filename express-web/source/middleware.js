import { matchedData, validationResult } from 'express-validator';

export async function handleErrors(req, res, next) {
    const r = validationResult(req);
    if (!r.isEmpty()) {
        await req.flash('errors', r.mapped());
        await req.flash('body', req.body);
        res.redirect('back');
    } else {
        req.body = matchedData(req);
        next();
    }
}

export async function getErrors(req, res, next) {
    res.locals.errors = await req.getFlash('errors') || {};
    res.locals.body = await req.getFlash('body') || {};
    next();
}

export function requestToContext (req, res, next) {
    res.locals.req = req;
    next();
}

export function extendFlashAPI(req, res, next) {
    req.getFlash = async function(name) {
        const d = await this.consumeFlash(name);
        return d.length > 0 ? d[0] : undefined;
    }
    next();
}