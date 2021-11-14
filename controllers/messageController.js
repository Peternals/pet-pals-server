const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const addConversation = async (req, res) => {
	try {
		//sampple
		const members = ["618fa057196cabc2a2c87eda", "618f883764f9c205fba3c43f"];
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
