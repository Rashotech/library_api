import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import error from './middleware/error';
import httpStatus from 'http-status';
import ApiError from './helpers/ApiError';

declare global {
    var __root: string
}

global.__root = path.join(__dirname);

// Routes
import { Routes } from './routes';

// Express App
const app:Application = express();

app.use(express.json());

app.use('/api', Routes);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
  
  // convert error to ApiError, if needed
app.use(error.errorConverter);
  
  // handle error
app.use(error.errorHandler);

export default app;

