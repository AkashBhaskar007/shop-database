const mongoose = require('mongoose');
const ownerSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    role: String,
    userName: { type: String, uniqie: true },
    password: String
});
module.exports = mongoose.model('OwnerRegistration', ownerSchema);