import  {errors} from 'celebrate';

import 'express-async-errors';

import express, { NextFunction, Request, Response } from "express";

import { router } from "./routes/routes";

import { AppError } from "./errors/AppError";

import upload from "./config/upload";

const app = express();

app.use(express.json());

//url/files/filename
app.use('/files', express.static(upload.directory));

app.use(router);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction ) => {
    if(err instanceof AppError){
      return response.status(err.statusCode).json({status: 'error', message: err.message});
    }
    console.log(err);
    return response.status(500).json({status: 'error', message: 'Internal server error'});
  }
);

app.listen(4444, () => console.log('Server in running on port 4444'));
