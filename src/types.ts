import { IncomingHttpHeaders } from "http";

export interface HeaderConfig {
  name: string | IncomingHttpHeaders;
  errorCode?: string;
  regExp?: RegExp;
  httpStatusCode: number;
}

export interface Config {
  headers: HeaderConfig[];
}
