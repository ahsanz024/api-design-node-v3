import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

// middlewares
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// Custom middleware
const loggingMiddleware = (req, res, next) => {
  console.log('custom middleware => loggingMiddleware')

  // We can also modify the req object and pass data to the route-controller
  // e.g.
  req.dataForController = 'middleware-data'

  // call next(), so it runs the "next" middleware/function after this
  next()
}

// this way its going to run for every request.
// app.use(loggingMiddleware)

// We can pass in array of middlewares in order too
// app.get('/middleware', [loggingMiddleware, loggingMiddleware2, loggingMiddleware3], (req, res) => {
// })

// We can limit the middlewares to certain request by using it in the get route below
app.get('/middleware', loggingMiddleware, (req, res) => {
  console.log('middleware')
  res.send({
    message: `data from middleware => ${req.dataForController}`
  })
})

// Globbing route
app.get('/glob/*', (req, res) => {
  res.send({
    message: `Globbed route => ${req.path}`
  })
})

// Pattern matching route
app.get(/(pattern)/, (req, res) => {
  res.send({
    message: `Pattern matching route => ${req.path}`
  })
})

// Root routes
app.get('/', (req, res) => {
  res.send({
    message: 'Hello World!'
  })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({
    message: 'ok'
  })
})

// separate router
const apiRouter = express.Router()
apiRouter.get('/test', (req, res) => {
  res.send({
    message: 'API router working'
  })
})

app.use('/api', apiRouter)

export const start = () => {
  app.listen(3000, () => {
    console.log('Server is running')
  })
}
