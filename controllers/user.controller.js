import userServices from "../services/user.service.js"

const userController = {}


userController.getUsers = (req, res) => {
   userServices.getUserProcess(req, res)
}

export default userController