import * as P from "fp-ts-routing";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import express from 'express'
import * as E from 'fp-ts/Either';

const app = express();

const homeMatch = P.end;
const searchMatch = P.lit('search').then(P.end)

const homePage = () => E.right('hello world')
const searchPage = ({query}) => E.right(`Search query: ${query}`)

const router = P.zero()
.alt(homeMatch.parser.map(homePage))
.alt(searchMatch.parser.map(searchPage))

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