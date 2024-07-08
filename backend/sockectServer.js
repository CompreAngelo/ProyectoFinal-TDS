import http from 'http';
import { Server } from 'socket.io';

const httpServer = http.createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("Cliente conectado al WebSocket", socket.id);

    socket.on("message", (message) => {
        console.log(`Mensaje recibido de ${socket.id}: ${JSON.stringify(message)}`);
        io.emit("message", message);
        console.log(`Mensaje enviado a ${socket.id}: ${JSON.stringify(message)}`);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado del WebSocket", socket.id);
    });
});

httpServer.listen(5000, () => {
    console.log('Socket.io server is listening on port 5000');
});
