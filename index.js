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
 const port = 8000;
 const server = createServer();
 server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Hello, world!!!!!!!!!!!');
 })
 server.listen(port);
