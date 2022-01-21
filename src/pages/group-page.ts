import * as t from 'io-ts'

export const GroupSlugC = t.brand(
  t.string,
  (input): input is t.Branded<string, { readonly GroupSlug: unique symbol }> => /^[A-Za-z0-9-]{0,30}$/.test(input),
  'GroupSlug'
)

export type GroupSlug = t.TypeOf<typeof GroupSlugC>

type Params = {slug: GroupSlug}

export const groupPage = (params: Params): string => (`${params.slug} is a valid group slug`)
