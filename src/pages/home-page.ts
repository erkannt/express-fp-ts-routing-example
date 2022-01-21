import { format } from 'fp-ts-routing'
import { groupsMatch, searchMatch } from '../matches'

export const homePage = (): string => (`
  <h1>fp-ts-routing and Express</h1>

  <ul>
    <li><a href=${format(groupsMatch.formatter, {})}>Groups page</a></li>
    <li><a href=${format(searchMatch.formatter, {query: 'test'})}>Example search</a></li>
  </ul>
`)
