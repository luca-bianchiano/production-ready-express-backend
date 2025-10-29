const http = require('http');
const createApp = require('./app');
const { connect } = require('./db');
const { port } = require('./config');

async function start() {
    await connect();
    const app = await createApp();
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}/graphql`);
    });
}

start().catch(err => {
    console.error('Failed to start', err);
    process.exit(1);
});
