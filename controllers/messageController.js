const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const addConversation = async (req, res) => {
	try {
		//sampple
		const members = ["61907b4ab2074915baac9cb0", "61907ec10db74d6c4d0e7cb6"];
		const checkIfExist = await Conversation.find({
			members: { $all: members },
		});
		if (checkIfExist.length === 0) {
			const seen = [
				{
					userId: "61907b4ab2074915baac9cb0",
				},
				{
					userId: "61907ec10db74d6c4d0e7cb6",
				},
			];
			const createAction = await Conversation.create({ members, seen });
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
		}).sort({ updatedAt: -1 });
		res.send(usersConversation);
	} catch (error) {
		console.log(error);
	}
};

const getAllMessages = async (req, res) => {
	try {
		const { user_id } = req.user;
		await Conversation.findOneAndUpdate(
			{ _id: req.params.id, [`seen.userId`]: { $eq: user_id } },
			{ [`seen.$.state`]: true }
		);
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
		const { conversation_id, sender_id, text, receiver_id } = req.body;
		console.log("sdsd", sender_id, req.user.user_id);
		await Conversation.findOneAndUpdate(
			{ _id: conversation_id },
			{ updatedAt: new Date() }
		);

		await Conversation.findOneAndUpdate(
			{ _id: conversation_id, ["seen.userId"]: { $eq: receiver_id } },
			{ [`seen.$.state`]: false }
		);
		await Message.create({ conversation_id, sender_id, text });
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
