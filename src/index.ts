import { evaluatedArticlesPage, groupSlugCodec } from './group-page'
import * as P from 'fp-ts-routing'
import { pipe } from 'fp-ts/function'
import express from 'express'
import * as O from 'fp-ts/Option'
import * as M from 'fp-ts/Monoid'
import * as t from 'io-ts'
import { homePage } from './home-page'
import { searchPage } from './search-page'

const app = express()

// basic route: /
const homeMatch = P.end

// with a query: /search?query=foobar
const searchMatch = P.lit('search')
  .then(P.query(
    t.strict({ query: t.string })
  ))
  .then(P.end)

// with regex guarded param: /groups/:slug(${groupSlugRegex})
const groupPageMatch = P.lit('groups')
  .then(P.type('slug', groupSlugCodec))
  .then(P.lit('evaluated-articles'))

const router = pipe(
  [
    homeMatch.parser.map(homePage),
    searchMatch.parser.map(searchPage),
    groupPageMatch.parser.map(evaluatedArticlesPage)
  ],
  M.concatAll(P.getParserMonoid())
)

app.get('*', (req, res) => {
  pipe(
    req.originalUrl,
    P.Route.parse,
    router.run,
    O.match(
      () => {
        res.status(404)
        res.send('Not found')
      },
      ([body]) => res.send(body)
    )
  )
})

app.listen(8080)