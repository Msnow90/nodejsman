

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: String,
	groupsJoined: [{ type: Schema.Types.ObjectId, ref: 'Group'}]
    
})

const User = mongoose.model('User', userSchema);


module.exports = User;


