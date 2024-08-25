import { createServer } from 'node:http';
import { URL } from 'node:url';

import { mainPage, errorPage, detailPage }
       from './source/controllers.js'

const port = 8000;

const reDetail = /\/([0-9abcdef]{24})/;

const server = createServer();

server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    const requestedPath = new URL(req.url,
          `http://${req.headers.host}`).pathname;

    const r = reDetail.exec(requestedPath);
    if (r)
        detailPage(res, r[1]);
    else if (requestedPath == '/')
        mainPage(res);
    else
        errorPage(res);
});

server.listen(port);
