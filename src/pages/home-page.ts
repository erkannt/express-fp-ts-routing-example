import { format } from 'fp-ts-routing'
import { groupsPageMatch, searchMatch } from '../matches'

export const homePage = (): string => (`
  <h1>fp-ts-routing and Express</h1>

  <ul>
    <li><a href=${format(groupsPageMatch.formatter, {})}>Groups page</a></li>
    <li><a href=${format(searchMatch.formatter, {query: 'test'})}>Example search</a></li>
  </ul>
`)
