import io from "socket.io-client";

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:3001/';

const socket = io(ENDPOINT);

export default socket;
