const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
    details: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('M_Prescription', PrescriptionSchema);
