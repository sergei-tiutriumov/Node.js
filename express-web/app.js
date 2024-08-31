import express from  'express';
import { config } from 'dotenv';
import './source/models/_loaddatabase.js';
import router from './sourse/router.js';

config();
const port = process.env.PORT || 8000;
const app = express();
app.listen(port);
app.use('/', router);
