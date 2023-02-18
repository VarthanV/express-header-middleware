import { IncomingHttpHeaders } from "http";

type ErrorType = "empty" | "regexp";

type MiddlewareError = {
  error: string;
  errorCode: string;
};

export const getErrorMessage = (
  headerName: string| IncomingHttpHeaders,
  errorType: ErrorType,
  errorCode: string,
  regexPattern: RegExp | undefined
): MiddlewareError => {
  let errorMessage : MiddlewareError ={
    error:'',
    errorCode:errorCode
  }
  switch (errorType) {
    case 'empty':
            errorMessage.errorCode = errorCode
            errorMessage.error = `${headerName} is required`
            return errorMessage
    case 'regexp':
        errorMessage.errorCode = errorCode
        errorMessage.error = `${headerName} does'nt match the regex pattern ${regexPattern?.toString()}`
        return errorMessage

    default:
      return { error: 'unexpected error occured', errorCode: errorCode };
  }
};
