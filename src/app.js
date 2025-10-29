const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const { getUserFromToken } = require('./middleware/auth');

async function createApp() {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            const token = req.headers.authorization || '';
            const user = await getUserFromToken(token);
            return { user };
        }
    });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.get('/', (req, res) => res.send('OK'));

    // basic error handler
    app.use((err, req, res, next) => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });

    return app;
}

module.exports = createApp;
