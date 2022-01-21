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
  .then(P.query(
    t.strict({ query: t.string })
    ))
  .then(P.end)

type SearchParams = { query: string }

const searchPage = (params: SearchParams): string => (`Search query: ${params.query}`)

// with regex guarded param: /groups/:slug(${groupSlugRegex})/evaluated-articles
const groupSlugCodec = t.brand(
  t.string,
  (input): input is t.Branded<string, { readonly GroupSlug: unique symbol }> => /^[A-Za-z0-9-]{0,30}$/.test(input),
  'GroupSlug'
)

type GroupSlug = t.TypeOf<typeof groupSlugCodec>

const evaluatedArticlesMatch = P.lit('groups')
  .then(P.type('slug', groupSlugCodec))
  .then(P.lit('evaluated-articles'))

type EvaluatedArticlesParams = {slug: GroupSlug}

const evaluatedArticlesPage = (params: EvaluatedArticlesParams): string => (`${params.slug} is a valid group slug`)

const router = pipe(
  [
    homeMatch.parser.map(homePage),
    searchMatch.parser.map(searchPage),
    evaluatedArticlesMatch.parser.map(evaluatedArticlesPage)
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