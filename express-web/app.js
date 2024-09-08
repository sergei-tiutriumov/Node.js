import express from  'express';
import { config } from 'dotenv';
import './source/models/_loaddatabase.js';
import router from './source/routes.js';

config();
const port = process.env.PORT || 8000;
//const port = 5555;
const app = express();
app.locals.appTitle = process.env.APPTITLE || "Express";    
app.set('view engine', 'ejs');
app.set('views', './source/templates');
app.use('/', router);
app.listen(port, () => {
    console.log(`Server is runnung on port ${port}`);
}).on('error', (err)=> {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
    } else {
        console.error(`Server error: ${err.message}`);
    }
});
