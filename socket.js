module.exports = (socket) => {
	console.log(socket.id);

	socket.on("sendMessage", (data) => {
		console.log(data);
		socket.broadcast.emit("receiveMessage", data);
	});

	socket.on("disconnect", () => {
		console.log("disconnected");
	});
};
