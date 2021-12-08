import io from "socket.io-client";

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://drawo-be.herokuapp.com/'
    : 'http://localhost:3001/';

const socket = io(ENDPOINT);

export default socket;
