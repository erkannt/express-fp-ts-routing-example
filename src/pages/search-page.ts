import * as t from 'io-ts'

export const SearchParamsC = t.strict({ query: t.string })

type Params = t.TypeOf<typeof SearchParamsC>

export const searchPage = (params: Params): string => (`Search query: ${params.query}`)
