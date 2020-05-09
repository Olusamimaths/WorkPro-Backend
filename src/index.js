import express from 'express'
import dotenv from 'dotenv'

import server from './server'

dotenv.config({})

// set up express app
const app = express()
const port = process.env.PORT || 5000

server.applyMiddleware({ app })

app.listen(port, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
)

