import express from 'express';
import { register, getUsers } from '../controllers/user.controller';
import { borrowBookValidation, userValidation } from '../validations';
import validate from '../middleware/validate';
import { getBooks, getSingleBook, borrowABook } from '../controllers/book.controller';

const router = express.Router();

router.post('/register', validate(userValidation), register); 
router.get('/users', getUsers); 
router.get('/books', getBooks); 
router.get('/books/:id', getSingleBook); 
router.post('/books/borrow',  validate(borrowBookValidation), borrowABook); 

export { router as Routes };