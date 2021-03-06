import { groupPage } from './pages/group-page'
import * as P from 'fp-ts-routing'
import { pipe } from 'fp-ts/function'
import * as M from 'fp-ts/Monoid'
import { homePage } from './pages/home-page'
import { searchPage } from './pages/search-page'
import { formHandlerMatch, formInputMatch, groupMatch, groupsMatch, homeMatch, searchMatch, } from './matches'
import { groupsPage } from './pages/groups-page'
import { formInputPage } from './pages/form-input-page'
import { formHandler } from './handlers/form-handler'

export const getRouter: P.Parser<string> = pipe(
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

export const postRouter: P.Parser<BodyHandler> = pipe(
  [
    formHandlerMatch.parser.map(formHandler),
  ],
  M.concatAll(P.getParserMonoid())
)
