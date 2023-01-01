import authServices from "../services/auth.service.js";

const authController = {};

authController.signUp = async (req, res) => {
    signupProcess(req, res); 
};

authController.signIn = async (req, res) => {
  try {
    authServices.signInProcess(req, res);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

authController.signOut =  (req, res) => {
   authServices.signOutProcess(req, res)

}

authController.refresh = (req, res) => {
  authServices.refreshProcess(req, res)
}
export default authController;
