import { env } from './config/config.js';
import { server } from './Services/Socket.js';

// PORT
const PORT = env.port || 8181

// LISTEN
server.listen(PORT, () => {
  console.log('listening at ', env.cors_origin , env.url_front);
})