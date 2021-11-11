let users = [];

const addUser = (userData) => {
	users.push(userData);
};

const deleteUser = (socket_id) => {
	users = users.filter((user) => user.socket_id !== socket_id);
};

const getUser = (receiver_id) => {
	return users.filter((user) => user.user_id === receiver_id);
};

module.exports = (socket, io) => {
	socket.on("addUser", (data) => {
		addUser({ ...data, socket_id: socket.id });
		console.log(users);
	});
	socket.on("senderTyping", (data) => {
		console.log(data.receiver_id);
		const user = getUser(data.receiver_id);
		console.log(user);
		if (user.length === 1) {
			console.log(data);
			io.to(user[0].socket_id).emit("senderTyping", data);
		}
	});

	socket.on("sendMessage", (data) => {
		console.log(data.receiver_id);
		const user = getUser(data.receiver_id);
		console.log(user);
		if (user.length === 1) {
			console.log(data);
			io.to(user[0].socket_id).emit("receiveMessage", data);
		}
	});

	socket.on("disconnect", () => {
		deleteUser(socket.id);
		console.log(users);
	});
};
