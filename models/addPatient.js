const mongoose = require('mongoose');
const moment = require('moment-timezone');


const addPatientSchema = new mongoose.Schema({
    patient_id: { type: String },
    patient_master_id: { type: String },
    clinic_id: { type: String },
    mobile: { type: Number },
    patientName: { type: String },
    doctorId: { type: String },
    doctor_name: { type: String },
    doctorSpecality: { type: String },
    first_visit: {
        type: String,
        default: () => {
            const moment = require('moment-timezone');
            return moment().tz('Asia/Kolkata').format('YYYY-MM-DD h:mm A');
        },
    },

    visit_count: { type: Number, default: 1 },
    last_visit: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('YYYY-MM-DD h:mm A'), // Initially same as first_visit
    },
    created_date_time: {
        type: String,
        default: () => {
            const moment = require('moment-timezone');
            return moment().tz('Asia/Kolkata').format('YYYY-MM-DD h:mm A');
        },
    },


}, { timestamps: true });

addPatientSchema.pre('save', function (next) {
    if (!this.patient_id) {
        this.patient_id = this._id.toString();
    }
    next();
});

exports.m_patientCollection = mongoose.model('M_patient', addPatientSchema);