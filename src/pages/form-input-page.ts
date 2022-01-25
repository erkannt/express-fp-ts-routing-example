import { format } from 'fp-ts-routing'
import { formHandlerMatch } from '../matches'

export const formInputPage = (): string => (`
  <h1>A input form</h1>

  <form action="${format(formHandlerMatch.formatter, {})}" method="post">
    <label for="name">Name: </label>
    <input id="name" type="text" name="name" value="Maria Mustermensch">
    <label for="fav_number">Fav Number: </label>
    <input id="fav_number" type="text" name="fav_number" value="42">
    <input type="submit" value="OK">
  </form>
`)
