import { Router, urlencoded, static as staticMiddleware } from 'express';
import methodOverride from 'method-override'; 
import { mainPage, detailPage, addPage, add, setDone, remove } from './controllers/todos.js';
import { requestToContext } from './middleware.js';


const router = Router();
router.use(staticMiddleware('public'));
router.use(urlencoded({ extended:true}));
router.use(methodOverride('_method'));
router.use(requestToContext);




router.get('/add', addPage);
router.post('/add', add);
router.get('/:id', detailPage);
router.put('/:id', setDone);
router.delete('/:id', remove);
router.get('/', mainPage);

export default router;
