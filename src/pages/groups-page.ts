import { GroupSlug } from './group-page'
import { format } from 'fp-ts-routing'
import { groupMatch } from '../matches'

const group = {
  name: 'The amazing Foos',
  slug: 'foo' as GroupSlug
}

export const groupsPage = (): string => (`
  <a href=${format(groupMatch.formatter, {slug: group.slug})}>${group.name}</a>
`)
