const mongoose = require('mongoose');

const registerClinicSchema = new mongoose.Schema({

    emailaddress: { type: String, required: true, unique: true, trim: true },
    password: { type: String },
    clinicName: { type: String },
    streetAddress: { type: String },
    streetAddress2: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: Number },
    createdDate: { type: Date, default: Date.now },
    lastUpdatedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('clinic_register', registerClinicSchema);

