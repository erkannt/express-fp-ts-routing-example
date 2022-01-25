import { format } from 'fp-ts-routing'
import { formInputMatch, groupsMatch, searchMatch } from '../matches'

export const homePage = (): string => (`
  <h1>fp-ts-routing and Express</h1>

  <ul>
    <li><a href=${format(searchMatch.formatter, {query: 'test'})}>Example search</a> (must contain a certain param)</li>
    <li><a href=${format(groupsMatch.formatter, {})}>Groups page</a> (part of url must match a regex)</li>
    <li><a href=${format(formInputMatch.formatter, {})}>Form input</a> (validation an parsing of body)</li>
  </ul>
`)
