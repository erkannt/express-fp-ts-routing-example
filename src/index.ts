import { groupPage } from './pages/group-page'
import * as P from 'fp-ts-routing'
import { pipe } from 'fp-ts/function'
import express from 'express'
import * as O from 'fp-ts/Option'
import * as M from 'fp-ts/Monoid'
import { homePage } from './pages/home-page'
import { searchPage } from './pages/search-page'
import { formHandlerMatch, formInputMatch, groupMatch, groupsMatch, homeMatch, searchMatch, } from './matches'
import { groupsPage } from './pages/groups-page'
import { formInputPage } from './pages/form-input-page'
import { formHandler } from './handlers/form-handler'

const app = express()

app.use(express.urlencoded({ extended: true }))

const getRouter: P.Parser<string> = pipe(
  [
    homeMatch.parser.map(homePage),
    searchMatch.parser.map(searchPage),
    groupsMatch.parser.map(groupsPage),
    groupMatch.parser.map(groupPage),
    formInputMatch.parser.map(formInputPage),
  ],
  M.concatAll(P.getParserMonoid())
)

type BodyHandler = (input: unknown) => string

const postRouter: P.Parser<BodyHandler> = pipe(
  [
    formHandlerMatch.parser.map(formHandler),
  ],
  M.concatAll(P.getParserMonoid())
)

app.get('*', (req, res) => {
  pipe(
    req.originalUrl,
    P.Route.parse,
    getRouter.run,
    O.match(
      () => {
        res.status(404)
        res.send('Not found')
      },
      ([body]) => res.send(body)
    )
  )
})

app.post('*', (req, res) => {
  pipe(
    req.originalUrl,
    P.Route.parse,
    postRouter.run,
    O.match(
      () => {
        res.status(404)
        res.send('Not found')
      },
      ([handler]) => pipe(
        req.body,
        handler,
        (body) => res.send(body)
      )
    )
  )
})

app.listen(8080)
