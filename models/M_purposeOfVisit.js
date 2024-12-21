const mongoose = require('mongoose');

const PurposeOfVisitSchema = mongoose.Schema({
    clinicId: {
        type: String,
        required: false
    },
    purpose: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('M_purposeofvisit', PurposeOfVisitSchema);
