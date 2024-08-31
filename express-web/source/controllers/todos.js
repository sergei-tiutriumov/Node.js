<<<<<<< HEAD
import { getList, getItem } from '../models/todos.js';
=======
import { getList } from '../models/todos.js';
>>>>>>> cf9af8ae5374dcf7239aad4cbda66c42e56cb990

export function mainPage(req, res) {
    const list = getList();
    let s = '<!doctype html>' +
            '<html>' +
            '   <head>' +
            '       <meta charset="UTF-8">' +
            '       <title>Список запланированных дел</title>' +
            '   </head>' +
            '   <body>' +
            '       <h1>Запланированные дела</h1>';
    for (let t of list) {
        const date = new Date(t.createdAt);
        s += `  <h2><a href="/${t._id}/">${t.title}</a><h2>` +
             `  <p>${t.desc}</p>` +
             `  <p>${date.toLocaleString() }</p> ` +
             '  <p>&nbsp;</p>';
    }
    
    s +=    '   </body>' +
            '</html>';
    res.send(s);
}

export function  detailedPage(req,res) {
        const t = getItem(req.params.id);

        if(!t) {
                errorPage(req,res);
                return;
        }

        const data = new Date(t.createdAt);
        res.send('<!doctype html>' +
                 '<html>' +
                 '  <head>' +
                 '      <meta charset="UTF-8">' +
                 `       <title>${t.title} :: Список запланированных дел </title>` +
                 '  </head>' +
                 '  <body>' +
                 `       <h1>${t.title}</h1>` +
                 `       <p>${t.desc}</p>` +
                 `       <p>Создано: ${date.toLocaleString() }</p>` +
                 '  </body>' +
                 '</html>');
}

function errorPage(req, res) {
        res.status(404);
        res.send('<!doctype html>'+
                 '<html>' +
                 '  <head>' +
                 '      <meta charset="UTF-8">' +
                 '      <title>Ошибка</title>' +
                 '  <head>' +
                 '  <body>' + 
                 '    <h1>Ошибка!</h1>' +
                 '    <p>Запрошенная страница не существует.</p>' +
                 '  </body>' +
                 '</html>');
}