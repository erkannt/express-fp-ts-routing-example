import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import { formatValidationErrors }  from 'io-ts-reporters'

const renderSuccess = (viewModel: Input) => `
  Form received:

  Name: ${viewModel.name}
  Favourite colour: ${viewModel.color}
`

const renderError = (input: unknown) => (errors: ReadonlyArray<string>) => `
  <h1>Bad input</h1>

  <h2>Issues</h2>

  ${errors.join('<br>')}

  <h2>Input provided</h2>

  ${JSON.stringify(input)}
`

const InputC = t.type({
  name: t.string,
  color: t.string,
})

type Input = t.TypeOf<typeof InputC>

export const formHandler = () => (input: unknown): string => pipe(
  input,
  InputC.decode,
  E.mapLeft(formatValidationErrors),
  E.match(
    renderError(input),
    renderSuccess,
  )
)
