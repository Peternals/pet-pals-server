const mongoose = require("mongoose");

const SeenSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	state: {
		type: Boolean,
		default: false,
	},
});

const ConversationSchema = new mongoose.Schema(
	{
		members: {
			type: Array,
		},
		seen: [SeenSchema],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Conversations", ConversationSchema);
