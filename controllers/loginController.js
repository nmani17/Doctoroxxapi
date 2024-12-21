
const Users = require('../models/registerClinic');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const email_id = req.body.email;
        const password_ = req.body.password;

        const user = await Users.findOne({ emailaddress: email_id });
        if (!user) {
            return res.status(404).json({
                response: "error",
                message: "No account found with this email."
            });
        }

        const isPasswordValid = await bcrypt.compare(password_, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                response: "error",
                message: "Incorrect password."
            });
        }

        return res.status(200).json({
            response: "succeeded",
            message: "Login successful",
            user: {
                id: user._id,
                email: user.emailaddress
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            response: "error",
            message: "An error occurred during login."
        });
    }
};


//exports.checkEmail = async (req, res) => {
//    try {
//		 const email_id = req.body.email;
  //      res.send('enter', email_id);
    //    return;
//
  //      const user = await User.findOne({ email });


    //    if (user) {
      //      return res.status(200).json({ message: 'clinic found with this email' });
        //} else {
         //   return res.status(404).json({ error: 'No clinic found with this email' });
       // }
  //  }catch (err) {
    //    console.error('Error during login:', error);
      //  res.status(500).json({ error: req.body });

    //}
//};


exports.checkEmail = async (req, res) => {
    try {
        const email_id = req.body.email;

		 const user = await Users.findOne({emailaddress:email_id});
		 
		if (user) {
            return res.status(200).json({
                response: "succeeded",
                message: "Clinic found with this email",
            });
        } else {
            return res.status(200).json({
                response: "failed",
                message: "No clinic found with this email",
            });
        }
		 
       
    } catch (error) {
       
        console.error('Error during checkEmail:', error);
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred.',
        });
    }
};



