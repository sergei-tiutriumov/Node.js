import { Router, urlencoded, static as staticMiddleware } from 'express';
import methodOverride from 'method-override'; 
import { mainPage, detailPage, addPage, add, setDone, remove, setOrder } from './controllers/todos.js';
import { requestToContext, handleErrors } from './middleware.js';
import { todoV } from './validators.js';
import { mainErrorHandler, error500Handler } from './error-handlers.js';
import cookieParser from 'cookie-parser';

const router = Router();
router.use(staticMiddleware('public'));
router.use(urlencoded({ extended:true}));
router.use(methodOverride('_method'));
router.use(requestToContext);
router.use(cookieParser());

router.get('/add', addPage);
router.post('/add', todoV, handleErrors, add);
router.get('/:id', detailPage);
router.put('/:id', setDone);
router.delete('/:id', remove);
router.get('/', mainPage);
router.post('/setorder', setOrder)

router.use(mainErrorHandler);
router.use(error500Handler);


export default router;
