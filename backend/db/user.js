const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
// Mongoose Hooks
userSchema.pre('save', async function() {
    let hashedString = await bcrypt.hash(this.password, salt);
    this.password = hashedString;
})


const User = mongoose.model("users", userSchema);

module.exports = User;