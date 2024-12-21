require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const clinicRoutes = require('./routes/registerClinicRoutes');
const login = require('./routes/login');
const doctor = require('./routes/addDoctorRoutes');
const addPatient = require('./routes/addPatinetRoutes');
const getPurpose = require('./routes/purposeofvisitRoutes');
const prescription = require('./routes/prescriptionRoutes');
const addComplaints = require('./routes/addcomplaintsRoute');
const getlabtest = require('./routes/labtestRoutes');
const getVaccine = require('./routes/vaccineRoute');

app.use(express.json());
// app.use(addPatient);
app.use('/api/clinic', clinicRoutes);
app.use('/api/clinic', login);
app.use('/api/doctors', doctor);
app.use('/api/addPatinet', addPatient);
app.use('/api/getPurpose', getPurpose);
app.use('/api/prescription', prescription);
app.use('/api/complaints', addComplaints);
app.use('/api/lab', getlabtest);
app.use('/api/vaccine', getVaccine);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Doctorxx server!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});