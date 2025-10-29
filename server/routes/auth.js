const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  getAvatars,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
router.get("/avatars", getAvatars);
// PHQ-9 result endpoints
router.post("/phq9/save", require("express").json(), (req, res, next) => savePhq9(req, res, next));
router.get("/phq9/:id", (req, res, next) => getPhq9(req, res, next));

module.exports = router;
