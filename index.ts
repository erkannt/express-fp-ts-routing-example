import * as P from "fp-ts-routing";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import express from 'express'

const app = express();

const homeMatch = P.end;


app.get("*", (req, res) => {
  pipe(
    req.originalUrl,
    (url) => P.parse(homeMatch.parser.map(O.some), P.Route.parse(url), O.none),
    O.fold(
      () => {
        res.status(404);
        res.send("Not found");
      },
      () => {
        res.send('hello world');
      }
    )
  );
});

app.listen(8080);