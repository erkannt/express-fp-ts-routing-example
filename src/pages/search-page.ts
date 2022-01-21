type Params = { query: string }

export const searchPage = (params: Params): string => (`Search query: ${params.query}`)
