import { IncomingHttpHeaders } from "http";

type ErrorType = "empty" | "regexp";

type MiddlewareError = {
  error: string;
  errorCode: string;
};

export const getErrorMessage = (
  headerName: string| IncomingHttpHeaders,
  errorType: ErrorType,
  errorCode: string
): MiddlewareError => {
  let errorMessage : MiddlewareError ={
    error:'',
    errorCode:errorCode
  }
  switch (errorType) {
    case "empty":
            errorMessage.errorCode = errorCode
    default:
      return { error: "unexpected error occured", errorCode: errorCode };
  }
};
