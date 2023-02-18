import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "./errors";
import HttpStatusCode from "./statusCodes";
import { Config, HeaderConfig } from "./types";

const headerMiddleware = (config: Config): Function => {
  return function (req: Request, res: Response, next: NextFunction) {
    validateHeaders(config.headers, req, res, next);
  };
};

function validateHeaders(
  headersFromConfig: HeaderConfig[],
  request: Request,
  res: Response,
  next: NextFunction
): void {
  for (const h of headersFromConfig) {
    const reqHeader = request.headers[`${h.name}`];
    if (!reqHeader) {
      const errorMessage = getErrorMessage(h.name, "empty", h.errorCode || "");
      res
        .status(h.httpStatusCode || HttpStatusCode.BAD_REQUEST)
        .json(errorMessage);
      return;
    }
    if (h.regExp) {
      if (typeof reqHeader == "string" && !h.regExp.test(reqHeader)) {
        const errorMessage = getErrorMessage(
          h.name,
          "regexp",
          h.errorCode || ""
        );
        res
          .status(h.httpStatusCode || HttpStatusCode.BAD_REQUEST)
          .json(errorMessage);
        return;
      }
    }
  }
  next();
}

export default headerMiddleware;
