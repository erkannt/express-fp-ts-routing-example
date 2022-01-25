import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import * as PR from 'io-ts/PathReporter'

const renderSuccess = (viewModel: Input) => `
  Form received:

  Name: ${viewModel.name}
  Favourite colour: ${viewModel.color}
`

const renderError = (error: string) => `
  Form invalid:

  ${error}
`

const InputC = t.type({
  name: t.string,
  color: t.string,
})

type Input = t.TypeOf<typeof InputC>

export const formHandler = () => (input: unknown): string => pipe(
  input,
  (foo) => {console.log('>>>>>>>>>>>>', foo); return foo},
  InputC.decode,
  E.mapLeft((errors) => PR.failure(errors).join('\n')),
  E.match(
    renderError,
    renderSuccess,
  )
)
