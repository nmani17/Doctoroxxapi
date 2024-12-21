const mongoose = require('mongoose');

const AddcomplaintsSchema = new mongoose.Schema({
    clinic_id: { type: String, required: true },
    patient_id: { type: String },
    doctorId: { type: String },
    patient_master_id: { type: String },
    visitId: { type: String },
    complaints: { type: String },
    Diagnosis: { type: String },
    prescription: { type: Object },
    labtest: { type: Object },
    vaccine: { type: Object },
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('M_complaints', AddcomplaintsSchema);
