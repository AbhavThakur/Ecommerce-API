import http from 'http';
import app from './app/app.js';

//create a server
const PORT = process.env.PORT || 4242;
const server = http.createServer(app);

server.listen(
  PORT,
  console.log(`Server running on port http://localhost:${PORT}`)
);
