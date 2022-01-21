import { GroupSlugC } from './pages/group-page'
import {lit, query, end, type} from 'fp-ts-routing'
import { SearchParamsC } from './pages/search-page'

// basic route: /
export const homeMatch = end

// with a query: /search?query=foobar
export const searchMatch = lit('search').then(query(SearchParamsC)).then(end)

export const groupsPageMatch = lit('groups').then(end)

// with regex guarded param: /groups/:slug(${groupSlugRegex})
export const groupPageMatch = lit('groups').then(type('slug', GroupSlugC)).then(lit('evaluated-articles'))

