import { getList, getItem } from '../models/todos.js';

export function mainPage(req, res) {
    let list = getList();
    
    if (req.query.search) {
        const q = req.query.search.toLowerCase();
        list = list.filter((el) => {
                if (el.title.toLowerCase().includes(q))
                        return true;
                else
                        if (el.desc)
                                return el.desc.toLowerCase().includes(q);
                        else
                                return false;
        });
    }
    res.render('main', {
        req: req,
        todos: list,
        title: 'Главная'
        });
}

export function  detailPage(req,res) {
        const t = getItem(req.params.id);

        if(!t) {
                errorPage(req,res);
                return;
        }
        res.render('detail', {
                todo: t,
                title: t.title
        });
}

function errorPage(req, res) {
        res.status(404);
        res.render('404', {
                title: 'Ошибка!'
        });
}