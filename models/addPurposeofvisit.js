const mongoose = require('mongoose');
const moment = require('moment-timezone');


const addPurposeofVisitSchema = new mongoose.Schema({
    patient_master_id: { type: String, required: false },
    clinic_id: { type: String, required: false },
    patient_id: { type: String, required: false },
    mobile: { type: Number, required: false },
    patientName: { type: String, required: false },
    doctorId: { type: String, required: false },
    doctor_name: { type: String, required: false },
    age_in_year: { type: Number, required: false },
    age_in_month: { type: Number, required: false },
    sex: { type: String, required: false },
    Dob: { type: String, required: false },
    guardian_name: { type: String, required: false },
    location: { type: String, required: false },
    purpose_of_visit: { type: String, required: false },
    other: { type: String, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    bp: { type: Number, required: false },
    pulse: { type: Number, required: false },
    temp: { type: Number, required: false },
    sugar: { type: Number, required: false },
    created_date_time: {
        type: String,
        default: () => {
            const moment = require('moment-timezone');
            return moment().tz('Asia/Kolkata').format('YYYY-MM-DD h:mm A');
        },
    },


},

    { timestamps: true });

exports.m_visitCollection = mongoose.model('M_visit', addPurposeofVisitSchema);

