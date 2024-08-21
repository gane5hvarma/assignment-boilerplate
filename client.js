require('dotenv').config();
const { io }  =  require("socket.io-client");
const server_url = process.env.SERVER_URL || 'ws://localhost:3000'
const socket = io(server_url, {transports: ['websocket']})

socket.on("connect", () => {
    console.log("Connected to server");
    for(let i=0;i<1000;i++){ // emit 1000 events
        socket.emit('sampleEndpoint', { someData: 'example' }, (response) => {
            console.log('Server response:', i,   response);
        });
    }
});