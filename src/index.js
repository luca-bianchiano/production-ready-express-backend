const http = require('http');
const app = require('./app');
const { connect } = require('./db');
const { port } = require('./config');

async function start() {
    try {
        await connect();
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log(`🚀 Server listening on http://localhost:${port}/graphql`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
}

start();
