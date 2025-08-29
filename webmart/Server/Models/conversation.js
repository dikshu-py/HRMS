const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],


},{
    timestamps: true, //  adds joining date in Schema
  })

const Item = mongoose.model("Conversation",conversationSchema)

module.exports = Item 
