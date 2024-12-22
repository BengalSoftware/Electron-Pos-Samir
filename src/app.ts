import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';


import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';

const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api routes
app.use('/api/v1', routes);

//serve static file under /api/v1/images 
app.use("/api/v1/images/", express.static(path.join(__dirname, '/uploads/assets')));



//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

//global error handler
app.use(globalErrorHandler);

export default app;
