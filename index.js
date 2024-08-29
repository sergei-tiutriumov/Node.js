// import chalk from 'chalk';
// import {config} from 'dotenv';
// config();

// if (process.argv.length <3) {
//     console.error(chalk.red('Укажите величину в дюймах'));
//     process.exit(1);
// }
// const inches = parseFloat(process.argv[2]);
// if (!inches) {
//     console.error('Input a number');
//     process.exit(1);
// }
// const centimetres = inches * 2.54;
// if (process.env.COLORIZE && process.env.COLORIZE === 'no') {
//     console.log(`${inches} дюймов>>> ${centimetres} sm.`);
//     console.log(`COLORIZE value: ${process.env.COLORIZE}`);
// }
// else {
//     console.log(`COLORIZE value: ${process.env.COLORIZE}`);
//     console.log(`${chalk.blue(inches)} дюймов>>> ${chalk.green(centimetres)} sm.`);
// }
 import { createServer } from 'node:http';
 import { URL } from 'node:url';
 import{ mainPage, errorPage, detailPage } from './source/controllers.js'

 const port = 8000;

 const reDetail = /^\/([0-9abcdef]{24})/;

 const server = createServer();
 server.addListener('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const requestedPath = new URL(req.url, `http://${req.headers.host}`).pathname;
    const r = reDetail.exec(requestedPath);
    if (r) detailPage(res, r[1]);
    else if (requestedPath === '/') mainPage(res);
    else errorPage(res);
 });
 server.listen(port);
