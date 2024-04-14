import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint(); // Get the start time
  next();
  const end = process.hrtime.bigint();

  const elapsed = Number(end - start) / 1e6;

  logger.info(`${req.method} ${req.path} - ${elapsed.toFixed(3)} ms`);
};