import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import { formatValidationErrors }  from 'io-ts-reporters'
import * as tt from 'io-ts-types'

const renderSuccess = (viewModel: Input) => `
  <h1>Form received:</h1>

  Name: ${viewModel.name} <br>
  Favourite number: ${viewModel.fav_number} <br>
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
  fav_number: tt.NumberFromString
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
