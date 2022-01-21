import * as P from "fp-ts-routing";
import { pipe } from "fp-ts/function";
import express from 'express'
import * as O from 'fp-ts/Option';
import * as M from 'fp-ts/Monoid'
import * as t from 'io-ts';

const app = express();

// home
const homeMatch = P.end;

const homePage = (): string => ('hello world')

// with a query: /search?query=foobar
const searchMatch = P.lit('search')
.then(P.query(t.strict({ query: t.string })))
.then(P.end)

type SearchParams = { query: string }

const searchPage = (params: SearchParams): string => (`Search query: ${params.query}`)

const router = pipe(
  [
    homeMatch.parser.map(homePage),
    searchMatch.parser.map(searchPage),
  ],
  M.concatAll(P.getParserMonoid())
)

app.get("*", (req, res) => {
  pipe(
    req.originalUrl,
    P.Route.parse,
    router.run,
    O.match(
      () => {
        res.status(404);
        res.send("Not found");
      },
      ([body]) => res.send(body)
    )
  );
});

app.listen(8080);