import { groupPage } from './pages/group-page'
import * as P from 'fp-ts-routing'
import { pipe } from 'fp-ts/function'
import express from 'express'
import * as O from 'fp-ts/Option'
import * as M from 'fp-ts/Monoid'
import { homePage } from './pages/home-page'
import { searchPage } from './pages/search-page'
import { homeMatch, searchMatch, groupPageMatch } from './matches'

const app = express()

const router = pipe(
  [
    homeMatch.parser.map(homePage),
    searchMatch.parser.map(searchPage),
    groupPageMatch.parser.map(groupPage)
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