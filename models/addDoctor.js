const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
    doctorName: { type: String, required: true },
    specialty: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
	consulting_fees :{
        type: String,
    },
    workhours: { type: Object },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('M_Doctor', doctorSchema);
