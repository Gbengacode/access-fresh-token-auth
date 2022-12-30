import { refreshProcess, signInProcess, signOutProcess, signupProcess } from "../services/auth.service.js";

const authController = {};

authController.signUp = async (req, res) => {
    signupProcess(req, res); 
};

authController.signIn = async (req, res) => {
  try {
    signInProcess(req, res);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

authController.signOut =  (req, res) => {
   signOutProcess(req, res)

}

authController.refresh = (req, res) => {
  refreshProcess(req, res)
}
export default authController;
