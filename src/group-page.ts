import * as t from 'io-ts'

export const groupSlugCodec = t.brand(
  t.string,
  (input): input is t.Branded<string, { readonly GroupSlug: unique symbol }> => /^[A-Za-z0-9-]{0,30}$/.test(input),
  'GroupSlug'
)

type GroupSlug = t.TypeOf<typeof groupSlugCodec>

type Params = {slug: GroupSlug}

export const evaluatedArticlesPage = (params: Params): string => (`${params.slug} is a valid group slug`)
