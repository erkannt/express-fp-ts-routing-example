import * as P from "fp-ts-routing";
import { pipe } from "fp-ts/function";
import express from 'express'
import * as E from 'fp-ts/Either';

const app = express();

const homeMatch = P.end;
const searchMatch = P.lit('search').then(P.end)

// Is there a way to get a compile error for not having this in the router?
export const foo = P.lit('foo')

const homePage = () => E.right('hello world')
const searchPage = ({query}) => E.right(`Search query: ${query}`)

const router = P.zero()
.alt(homeMatch.parser.map(homePage))
// How can I get the compiler to complain that `searchMatch`
// is not providing `query` param to `searchPage`?
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