const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../Model/Model');
const sendEmail = require('../Config/Email');

exports.handleForgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

   
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `<p>You requested a password reset. Please click the link below to reset your password:</p>
                      <a href="${resetUrl}">Reset Password</a>`;

    await sendEmail({
        email,
        subject: 'Password Reset Request',
        message
    });

    return 'Password reset link sent to your email';
};
// changes is to done byt cha
exports.handleResetPassword = async (resetToken, newPassword) => {
    try {
      // Log the received token for debugging
      console.log("Received reset token:", resetToken);
      console.log("Current time:", new Date().toISOString());
  
      // Find the user with the reset token and ensure the token hasn't expired
      const user = await User.findOne({
        resetToken,
        resetTokenExpiry: { $gt: Date.now() }, // Only consider tokens that haven't expired
      });
  
      // If no user is found or token is expired, throw an error
      if (!user) {
        console.error("Error: Invalid or expired token.");
        throw new Error("Invalid or expired token");
      }
  
      // Log the user's details for debugging (you may remove this in production)
      console.log("User found:", user.email);
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password and clear the reset token and expiry fields
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
  
      // Save the user document with updated information
      await user.save();
  
      console.log("Password has been successfully reset for user:", user.email);
      return "Password has been reset successfully";
    } catch (error) {
      // Improved error logging
      console.error("Error in handleResetPassword:", error.message);
      throw new Error("Password reset failed due to an invalid or expired token");
    }
  };
  


// old code 
// exports.handleResetPassword = async (resetToken, newPassword) => {
//   try {
   
//       const user = await User.findOne({
//           resetToken,
//           resetTokenExpiry: { $gt: Date.now() } 
//       });
//       if (!user) throw new Error('Invalid or expired token');
//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//       user.password = hashedPassword;
//       user.resetToken = undefined; 
//       user.resetTokenExpiry = undefined; 

//       await user.save();

//       return 'Password has been reset';
//   } catch (error) {
//       console.error('Error in handleResetPassword:', error);
//       throw new Error('Password reset failed');
//   }
// };



