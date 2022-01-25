import * as P from 'fp-ts-routing'
import { pipe } from 'fp-ts/function'
import express from 'express'
import * as O from 'fp-ts/Option'
import { getRouter, postRouter } from './routers'

const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('*', (req, res) => {
  pipe(
    req.originalUrl,
    P.Route.parse,
    getRouter.run,
    O.match(
      () => {
        res.status(404)
        res.send('Not found')
      },
      ([body]) => res.send(body)
    )
  )
})

app.post('*', (req, res) => {
  pipe(
    req.originalUrl,
    P.Route.parse,
    postRouter.run,
    O.match(
      () => {
        res.status(404)
        res.send('Not found')
      },
      ([handler]) => pipe(
        req.body,
        handler,
        (body) => res.send(body)
      )
    )
  )
})

app.listen(8080)
