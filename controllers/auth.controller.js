import { signInProcess, signupProcess } from "../services/auth.service.js";

const authController = {};

authController.signUp = async (req, res) => {
  try {
    signupProcess(req, res);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

authController.signIn = async (req, res) => {
  try {
    signInProcess(req, res);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default authController;
