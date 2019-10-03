


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({

    name: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    members: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    events: [{ type: Schema.Types.ObjectId, ref: 'Event'}]

})

module.exports = mongoose.model('Group', groupSchema);




