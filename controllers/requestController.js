const CarerSchema = require("../models/Carer");
const User = require("../models/User");

const modifyRequest = async (req, res) => {
	try {
		const { request_id, user_id, action } = req.body;
		await User.updateOne(
			{ "Carer.requests._id": request_id, _id: user_id },
			{ $set: { "Carer.requests.$.status": action } }
		);
		console.log(req.body);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	modifyRequest,
};
