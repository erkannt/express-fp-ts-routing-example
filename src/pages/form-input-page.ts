import { format } from 'fp-ts-routing'
import { formHandlerMatch } from '../matches'

export const formInputPage = (): string => (`
  <h1>A input form</h1>

  <form action="${format(formHandlerMatch.formatter, {})}" method="post">
    <label for="team_name">Enter name: </label>
    <input id="team_name" type="text" name="name_field" value="Default name for team.">
    <input type="submit" value="OK">
  </form>
`)
