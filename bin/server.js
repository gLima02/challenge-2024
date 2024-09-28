const http = require('http')
const app = require('../src/app');
const { log } = require('console');
const port = parseInt(process.env.port, 10) || 3000
const server = http.createServer(app)

server.listen(port);
server.on('listening', onListening )
log(`Api inicializada na porta ${port}`)
function onListening () {
    const addr = server.address();
    bind = typeof addr == 'string' ? 'pipe' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind)
}

