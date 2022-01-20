import * as P from "fp-ts-routing";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import express from 'express'
import * as E from 'fp-ts/Either';

const app = express();

const homeMatch = P.end;
const fooMatch = P.lit('foo').then(P.end)

const router = P.zero()
.alt(homeMatch.parser.map(() => E.right('hello world')))
.alt(fooMatch.parser.map(() => E.right('foo')))

app.get("*", (req, res) => {
  pipe(
    req.originalUrl,
    (url) => P.parse(router, P.Route.parse(url), E.left('not-found')),
    E.match(
      () => {
        res.status(404);
        res.send("Not found");
      },
      (body) => res.send(body)
    )
  );
});

app.listen(8080);