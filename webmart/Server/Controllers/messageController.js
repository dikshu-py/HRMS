const Item = require('../Models/message');

const Message = require('../Models/message');
const Conversation = require('../Models/conversation');

exports.sendMessage = async (req, res) => {
	try {
		const { message } = req.body
		console.log(req.user)
		const { id: receiverId } = req.params;
		const senderId = req.user.id;
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		res.status(201).json(newMessage);

	} catch (err) {
		console.log(err)
		res.status(400).json({ success: false, message: "Failed to Send Message", error: err.message });
	}
}

exports.getAllMessage = async (req, res) => {
	try {
		const { id: receiverId } = req.params;
		const senderId = req.user.id;
		console.log(receiverId,senderId)

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		}).populate('messages'); //instead of all ids it will give all Data not only IDS
		//messages is used here as wit hthis name it is defined in Conversation Model


		if (!conversation) return res.status(200).json([]);
		res.status(200).json(conversation.messages)
	} catch (err) {
		res.status(400).json({ error: " Inetrnal Server Error in Receive" })
	}




}