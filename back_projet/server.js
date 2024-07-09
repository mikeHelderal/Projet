import { env } from './config/config.js';
import { server } from './Services/Socket.js';

// PORT
const PORT = env.port || 8181

// LISTEN
server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
})