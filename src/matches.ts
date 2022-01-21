import { GroupSlugC } from './pages/group-page'
import * as P from 'fp-ts-routing'
import * as t from 'io-ts'


// basic route: /
export const homeMatch = P.end

// with a query: /search?query=foobar
export const searchMatch = P.lit('search')
  .then(P.query(
    t.strict({ query: t.string })
  ))
  .then(P.end)

// with regex guarded param: /groups/:slug(${groupSlugRegex})
export const groupPageMatch = P.lit('groups')
  .then(P.type('slug', GroupSlugC))
  .then(P.lit('evaluated-articles'))
