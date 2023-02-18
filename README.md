# express-header-middleware 

A middleware for express js to validate your headers and abort the request with response when the criteria for the headers is not satisifed

## Installation

```sh
    npm i express-header-middleware --save
```

## Usage

```js

import express, { Express } from "express";

const app: Express = express();

app.use(
  headerMiddleware({
    headers: [
      {
        name: "foo",
        errorCode:"FOO",
        httpStatusCode:403, // optional, Default 400
        regExp:new RegExp("\\w+") // optional , Default none

      },

    ],
  })
);

app.get("/", (req, res) => {
  res.send("fooo");
  return;
});

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:3000`);
});

```

## Empty Case

```json
{
  "error": "foo is required",
  "errorCode": "FOO"
}
```

## Regex pattern is not matched

```json
{
    "error": "foo does'nt match the regex pattern /\\d+/",
    "errorCode": "FOO"
}
```
