import { join } from "node:path";
import { rm } from "node:fs/promises";
import createError from 'http-errors';

import { getList, getItem, addItem, setDoneItem, deleteItem }
       from '../models/todos.js';
import { currentDir } from "../utility.js";

import { addendumUploader } from '../uploaders.js';

export async function mainPage(req, res) {
    const list = await getList(req.user.id, req.cookies.doneAtLast,
                               req.query.search);
    res.render('main', {
        todos: list,
        title: 'Главная'
    });
}

export async function detailPage(req, res, next) {
    try {
        const t = await getItem(req.params.id, req.user.id);

        if (!t)
            throw createError(404, 'Запрошенное дело не существует');

        res.render('detail', {
            todo: t,
            title: t.title
        });
    } catch (err) {
        next(err);
    }
}

export function addPage(req, res) {
    res.render('add', { title: 'Добавление дела' });
}

export function addendumWrapper(req, res, next) {
    addendumUploader(req, res, (err) => {
        if (err)
            if (err.code == 'LIMIT_FILE_SIZE') {
                req.errorObj = {
                    addendum: {
                        msg: 'Допускаются лишь файлы размером ' +
                             'не более 100 Кбайт'
                    }
                };
                next();
            } else
                next(err);
        else
            next();
    });
}

export async function add(req, res) {
    const todo = {
        title: req.body.title,
        desc: req.body.desc || '',
        user: req.user.id,
        createdAt: new Date()
    };
    if (req.file)
        todo.addendum = req.file.filename;
    await addItem(todo);
    res.redirect('/');
}

export async function setDone(req, res, next) {
    try {
        if (await setDoneItem(req.params.id, req.user.id))
            res.redirect('/');
        else
            throw createError(404, 'Запрошенное дело не существует');
    } catch (err) {
        next(err);
    }
}

export async function remove(req, res, next) {
    try {
        const t = await getItem(req.params.id, req.user.id);
        if (!t)
            throw createError(404, 'Запрошенное дело не существует');
        if (t.addendum)
            await rm(join(currentDir, 'storage', 'uploaded',
                                                 t.addendum));
        await deleteItem(t._id, req.user.id);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
}

export function setOrder(req, res) {
    res.cookie('doneAtLast', req.body.done_at_last);
    res.redirect('/');
}
