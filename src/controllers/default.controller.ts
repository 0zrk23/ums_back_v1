import { NextFunction, Request, Response } from 'express';

export class DefaultController {
  public ping = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: 'pong' });
    } catch (error) {
      next(error);
    }
  };
}