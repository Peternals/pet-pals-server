const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const addConversation = async (req, res) => {
	try {
		//sampple
		const members = ["618e68b8206149d0d25789df", "618e68e5206149d0d25789e2"];
		const checkIfExist = await Conversation.find({
			members: { $all: members },
		});
		if (checkIfExist.length === 0) {
			const createAction = await Conversation.create({ members });
			return res.send(createAction);
		}
		return res.send(false);
	} catch (error) {
		console.log(error);
	}
};

const getAllConversations = async (req, res) => {
	try {
		//sample token
		const { user_id } = req.user;
		const usersConversation = await Conversation.find({
			members: { $all: [user_id] },
		});
		res.send(usersConversation);
	} catch (error) {
		console.log(error);
	}
};

const getAllMessages = async (req, res) => {
	try {
		//sample token
		const usersMessages = await Message.find({
			conversation_id: req.params.id,
		});
		res.send(usersMessages);
	} catch (error) {
		console.log(error);
	}
};

const saveMessages = async (req, res) => {
	try {
		console.log(req.body);
		const { conversation_id, sender_id, text } = req.body;
		const messages = await Message.create({ conversation_id, sender_id, text });
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	addConversation,
	getAllConversations,
	getAllMessages,
	saveMessages,
};
