


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    
    name: String,
	attendees: [{ type: Schema.Types.ObjectId, ref: 'User'}]

})

module.exports = mongoose.model('Event', eventSchema);











