import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from './db/config/config'

import typeDefs from './api/graphql/Types'
import resolvers from './api/graphql/Resolvers'

// set up database connection
const env = process.env.NODE_ENV || 'development'
const { host, db_port, database, jwtsecret } = config[env]

mongoose.Promise = global.Promise

mongoose
    .connect(`mongodb://${host}:${db_port}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to database successfully.'))
    .catch(e => console.log('Error: ', e))

// set up express app
const app = express()
const port = process.env.PORT || 5000

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || ''

        if (!token) return {}

        try {
            const user = jwt.verify(token, jwtsecret)

            return { user }
        } catch (error) {
            return {}
        }
    }
})

server.applyMiddleware({ app })

app.listen(port, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
)

// app.on('end', () => mongoose.connection.close())
