const mongoose = require('mongoose');

const VerificationSchema = mongoose.Schema({
    authId: {type: String, unique: true},
    secretKey: {type: String, unique: true}
});

const Verification = mongoose.model('Verification', VerificationSchema);

module.exports = Verification;