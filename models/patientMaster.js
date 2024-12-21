const mongoose = require('mongoose');
const moment = require('moment-timezone');


const m_patient_masterSchema = new mongoose.Schema({
    patient_master_id: { type: String },
    clinic_id: { type: String, required: false },
    mobile: { type: Number, required: false },
    created_date_time: {
        type: String,
        default: () => {
            const moment = require('moment-timezone');
            return moment().tz('Asia/Kolkata').format('YYYY-MM-DD h:mm A');
        },
    },
});

m_patient_masterSchema.pre('save', function (next) {
    if (!this.patient_master_id) {
        this.patient_master_id = this._id.toString();
    }
    next();
});

exports.m_patient_mastercollection = mongoose.model('m_patient_master', m_patient_masterSchema);