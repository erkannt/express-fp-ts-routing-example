import { GroupSlugC } from './pages/group-page'
import {lit, query, end, type} from 'fp-ts-routing'
import { SearchParamsC } from './pages/search-page'

export const homeMatch = end

export const searchMatch = lit('search').then(query(SearchParamsC)).then(end)

export const groupsMatch = lit('groups').then(end)

export const groupMatch = lit('groups').then(type('slug', GroupSlugC)).then(lit('evaluated-articles'))

export const formInputMatch = lit('form')

export const formHandlerMatch = lit('form')

