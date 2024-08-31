const authService = require('../Service/Password');

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const message = await authService.handleForgotPassword(email);
        res.status(200).json({ message });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const resetPassword = async (req, res) => {
  try {
      const { newPassword } = req.body;
      const { token } = req.params; 
   
      // Get the token from the URL
      const message = await authService.handleResetPassword(token, newPassword);
      res.status(200).json({ message });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};
module.exports = {forgotPassword,resetPassword}
